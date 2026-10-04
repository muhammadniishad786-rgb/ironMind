import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import Exercise from "../models/exerciseModel.js";

dotenv.config();

console.log(
  "Gemini API Key loaded:",
  !!process.env.GEMINI_API_KEY
);

if (!process.env.GEMINI_API_KEY) {
  throw new Error(
    "GEMINI_API_KEY is missing from backend .env"
  );
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// =====================================================
// GENERAL AI CHAT
// =====================================================

export const generateAIResponse = async (message) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: message,

    config: {
      systemInstruction: `
        You are IronMind AI, a helpful fitness assistant.

        Give practical and beginner-friendly fitness guidance.

        Keep answers clear, useful and concise.

        Do not diagnose medical conditions.
        Do not provide medical treatment.
      `,
    },
  });

  return response.text;
};

// =====================================================
// AI WORKOUT GENERATOR
// =====================================================

export const generateWorkout = async ({
  muscleGroup,
  difficulty,
  goal,
  equipment,
}) => {
  try {
    // -------------------------------------------------
    // 1. Find matching exercises from MongoDB
    // -------------------------------------------------

    const exercises = await Exercise.find({
      muscleGroup: muscleGroup.toLowerCase(),
      equipment: equipment.toLowerCase(),
    }).select(
      "_id name muscleGroup equipment difficulty instructions"
    );

    console.log(
      `Found ${exercises.length} exercises for ${muscleGroup} + ${equipment}`
    );

    // -------------------------------------------------
    // 2. Make sure exercises exist
    // -------------------------------------------------

    if (exercises.length === 0) {
      throw new Error(
        "No exercises found for the selected muscle group and equipment"
      );
    }

    // -------------------------------------------------
    // 3. Create a simplified exercise library
    // -------------------------------------------------
    // We give Gemini the MongoDB ID.
    // Gemini must return this ID instead of inventing
    // exercise names.
    // -------------------------------------------------

    const exerciseLibrary = exercises.map((exercise) => ({
      exerciseId: exercise._id.toString(),
      name: exercise.name,
      difficulty: exercise.difficulty,
    }));

    console.log(
      "Exercises provided to Gemini:",
      exerciseLibrary
    );

    // -------------------------------------------------
    // 4. Create AI prompt
    // -------------------------------------------------

    const prompt = `
You are generating a workout for the IronMind fitness application.

USER REQUIREMENTS:

Muscle Group: ${muscleGroup}
Difficulty: ${difficulty}
Goal: ${goal}
Equipment: ${equipment}

AVAILABLE EXERCISES:

${JSON.stringify(exerciseLibrary, null, 2)}

====================================================
IMPORTANT RULES
====================================================

1. You MUST select exercises ONLY from the AVAILABLE EXERCISES list.

2. NEVER create a new exercise.

3. NEVER invent an exercise.

4. NEVER modify an exercise name.

5. NEVER create your own exerciseId.

6. Every exerciseId in your response MUST exactly match
   one of the exerciseId values provided above.

7. The "name" must exactly match the corresponding
   exercise name from the AVAILABLE EXERCISES list.

8. Do not use exercises that are not in the list.

9. Do not repeat the same exercise.

10. Generate between 2 and 6 exercises depending on
    how many suitable exercises are available.

11. Sets should normally be between 2 and 4.

12. Reps should normally be between 6 and 15.

13. Rest time must be in seconds.

14. Keep the workout realistic for the selected difficulty.

15. The workout should match the user's goal.

====================================================
OUTPUT FORMAT
====================================================

Return ONLY valid JSON.

Do NOT use markdown.

Do NOT use code blocks.

Use exactly this structure:

{
  "workoutName": "string",
  "description": "string",
  "muscleGroup": "string",
  "difficulty": "string",
  "exercises": [
    {
      "exerciseId": "MongoDB exercise ID",
      "name": "Exact exercise name",
      "sets": number,
      "reps": number,
      "restTime": number
    }
  ]
}
`;

    // -------------------------------------------------
    // 5. Send request to Gemini
    // -------------------------------------------------

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",

      contents: prompt,

      config: {
        systemInstruction: `
          You are IronMind AI Workout Generator.

          Generate structured gym workouts using ONLY
          the exercises provided by IronMind.

          You must use the exact MongoDB exerciseId
          provided in the exercise library.

          Never invent exercises.

          Never create new exercise IDs.

          Never modify exercise names.

          Always return valid JSON.
        `,
      },
    });

    const text = response.text?.trim();

    console.log("Gemini workout response:");
    console.log(text);

    // -------------------------------------------------
    // 6. Check empty response
    // -------------------------------------------------

    if (!text) {
      throw new Error(
        "Gemini returned an empty response"
      );
    }

    // -------------------------------------------------
    // 7. Parse JSON
    // -------------------------------------------------

    let workout;

    try {
      workout = JSON.parse(text);
    } catch (error) {
      console.error(
        "Invalid AI workout JSON:",
        text
      );

      throw new Error(
        "AI returned an invalid workout format"
      );
    }

    // -------------------------------------------------
    // 8. Validate workout structure
    // -------------------------------------------------

    if (
      !workout.workoutName ||
      !Array.isArray(workout.exercises) ||
      workout.exercises.length === 0
    ) {
      throw new Error(
        "AI returned an incomplete workout"
      );
    }

    // -------------------------------------------------
    // 9. Create a map of valid exercise IDs
    // -------------------------------------------------

    const validExercises = new Map();

    exercises.forEach((exercise) => {
      validExercises.set(
        exercise._id.toString(),
        exercise
      );
    });

    // -------------------------------------------------
    // 10. Validate every AI exercise
    // -------------------------------------------------

    const validatedExercises = workout.exercises.map(
      (aiExercise) => {
        const databaseExercise =
          validExercises.get(
            aiExercise.exerciseId
          );

        // ---------------------------------------------
        // Invalid ID
        // ---------------------------------------------

        if (!databaseExercise) {
          throw new Error(
            `AI returned an invalid exerciseId: ${aiExercise.exerciseId}`
          );
        }

        // ---------------------------------------------
        // Validate exercise name
        // ---------------------------------------------

        if (
          aiExercise.name !==
          databaseExercise.name
        ) {
          throw new Error(
            `Exercise name mismatch for ${aiExercise.exerciseId}`
          );
        }

        // ---------------------------------------------
        // Return validated exercise
        // ---------------------------------------------

        return {
          exerciseId:
            databaseExercise._id.toString(),

          name: databaseExercise.name,

          sets: Number(aiExercise.sets) || 3,

          reps: Number(aiExercise.reps) || 10,

          restTime:
            Number(aiExercise.restTime) || 60,

          instructions:
            databaseExercise.instructions,
        };
      }
    );

    // -------------------------------------------------
    // 11. Remove duplicate exercises
    // -------------------------------------------------

    const uniqueExercises = [];

    const usedExerciseIds = new Set();

    for (const exercise of validatedExercises) {
      if (
        !usedExerciseIds.has(
          exercise.exerciseId
        )
      ) {
        usedExerciseIds.add(
          exercise.exerciseId
        );

        uniqueExercises.push(exercise);
      }
    }

    // -------------------------------------------------
    // 12. Return final validated workout
    // -------------------------------------------------

    return {
      workoutName: workout.workoutName,

      description:
        workout.description ||
        `AI generated ${muscleGroup} workout for ${goal}.`,

      muscleGroup,

      difficulty,

      exercises: uniqueExercises,
    };
  } catch (error) {
    console.error(
      "Generate workout error:",
      error
    );

    throw error;
  }
};