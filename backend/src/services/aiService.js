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
    // 1. Normalize equipment
    // -------------------------------------------------

    const normalizedMuscleGroup =
      muscleGroup.toLowerCase();

    const normalizedDifficulty =
      difficulty.toLowerCase();

    const normalizedEquipment = equipment.map(
      (item) => item.toLowerCase()
    );

    // -------------------------------------------------
    // 2. Find matching exercises from MongoDB
    // -------------------------------------------------
    // $in allows multiple equipment types.
    //
    // Example:
    // ["dumbbell", "machine", "cable"]
    //
    // MongoDB will return exercises using ANY
    // of these equipment types.
    // -------------------------------------------------

    const exercises = await Exercise.find({
      muscleGroup: normalizedMuscleGroup,

      equipment: {
        $in: normalizedEquipment,
      },
    }).select(
      "_id name muscleGroup equipment difficulty instructions"
    );

    console.log(
      `Found ${exercises.length} exercises for ${normalizedMuscleGroup} + ${normalizedEquipment.join(
        ", "
      )}`
    );

    // -------------------------------------------------
    // 3. Make sure exercises exist
    // -------------------------------------------------

    if (exercises.length === 0) {
      throw new Error(
        "No exercises found for the selected muscle group and equipment"
      );
    }

    // -------------------------------------------------
    // 4. Create simplified exercise library
    // -------------------------------------------------
    // Gemini only receives exercises that actually
    // exist in MongoDB.
    // -------------------------------------------------

    const exerciseLibrary = exercises.map(
      (exercise) => ({
        exerciseId: exercise._id.toString(),
        name: exercise.name,
        equipment: exercise.equipment,
        difficulty: exercise.difficulty,
      })
    );

    console.log(
      "Exercises provided to Gemini:",
      exerciseLibrary
    );

    // -------------------------------------------------
    // 5. Create AI prompt
    // -------------------------------------------------

    const prompt = `
You are generating a workout for the IronMind fitness application.

USER REQUIREMENTS:

Muscle Group: ${normalizedMuscleGroup}
Difficulty: ${normalizedDifficulty}
Goal: ${goal}
Equipment Available: ${normalizedEquipment.join(", ")}

AVAILABLE EXERCISES:

${JSON.stringify(
  exerciseLibrary,
  null,
  2
)}

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

9. Do not use equipment that is not listed in
   "Equipment Available".

10. The user may have multiple equipment types available.
    You may select exercises using ANY of the available
    equipment types.

11. When multiple equipment types are available,
    create a balanced workout using different equipment
    when appropriate.

12. You do NOT need to use every available equipment type.

13. Do not repeat the same exercise.

14. Generate between 2 and 6 exercises depending on
    how many suitable exercises are available.

15. Sets should normally be between 2 and 4.

16. Reps should normally be between 6 and 15.

17. Rest time must be in seconds.

18. Keep the workout realistic for the selected difficulty.

19. The workout should match the user's goal.

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
    // 6. Send request to Gemini
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

          Only use equipment available to the user.

          Always return valid JSON.
        `,
      },
    });

    const text = response.text?.trim();

    console.log("Gemini workout response:");
    console.log(text);

    // -------------------------------------------------
    // 7. Check empty response
    // -------------------------------------------------

    if (!text) {
      throw new Error(
        "Gemini returned an empty response"
      );
    }

    // -------------------------------------------------
    // 8. Parse JSON
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
    // 9. Validate workout structure
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
    // 10. Create map of valid exercise IDs
    // -------------------------------------------------

    const validExercises = new Map();

    exercises.forEach((exercise) => {
      validExercises.set(
        exercise._id.toString(),
        exercise
      );
    });

    // -------------------------------------------------
    // 11. Validate every AI exercise
    // -------------------------------------------------

    const validatedExercises =
      workout.exercises.map(
        (aiExercise) => {
          const databaseExercise =
            validExercises.get(
              aiExercise.exerciseId
            );

          // -------------------------------------------
          // Invalid ID
          // -------------------------------------------

          if (!databaseExercise) {
            throw new Error(
              `AI returned an invalid exerciseId: ${aiExercise.exerciseId}`
            );
          }

          // -------------------------------------------
          // Validate exercise name
          // -------------------------------------------

          if (
            aiExercise.name !==
            databaseExercise.name
          ) {
            throw new Error(
              `Exercise name mismatch for ${aiExercise.exerciseId}`
            );
          }

          // -------------------------------------------
          // Validate equipment
          // -------------------------------------------

          if (
            !normalizedEquipment.includes(
              databaseExercise.equipment
            )
          ) {
            throw new Error(
              `AI selected unavailable equipment: ${databaseExercise.equipment}`
            );
          }

          // -------------------------------------------
          // Return validated exercise
          // -------------------------------------------

          return {
            exerciseId:
              databaseExercise._id.toString(),

            name:
              databaseExercise.name,

            sets:
              Number(aiExercise.sets) || 3,

            reps:
              Number(aiExercise.reps) || 10,

            restTime:
              Number(
                aiExercise.restTime
              ) || 60,

            instructions:
              databaseExercise.instructions,
          };
        }
      );

    // -------------------------------------------------
    // 12. Remove duplicate exercises
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

        uniqueExercises.push(
          exercise
        );
      }
    }

    // -------------------------------------------------
    // 13. Return final validated workout
    // -------------------------------------------------

    return {
      workoutName:
        workout.workoutName,

      description:
        workout.description ||
        `AI generated ${normalizedMuscleGroup} workout for ${goal}.`,

      muscleGroup:
        normalizedMuscleGroup,

      difficulty:
        normalizedDifficulty,

      equipment:
        normalizedEquipment,

      exercises:
        uniqueExercises,
    };
  } catch (error) {
    console.error(
      "Generate workout error:",
      error
    );

    throw error;
  }
};