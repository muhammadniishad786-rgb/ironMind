import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

console.log("Gemini API Key loaded:", !!process.env.GEMINI_API_KEY);

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing from backend .env");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// General AI Chat
export const generateAIResponse = async (message) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: message,
    config: {
      systemInstruction: `
        You are IronMind AI, a helpful fitness assistant.

        Give practical and beginner-friendly fitness guidance.
        Keep answers clear, useful, and concise.

        Do not diagnose medical conditions.
        Do not provide medical treatment.
      `,
    },
  });

  return response.text;
};

// AI Workout Generator
export const generateWorkout = async ({
  muscleGroup,
  difficulty,
  goal,
  equipment,
}) => {
  const prompt = `
Create a workout for the IronMind fitness application.

Muscle Group: ${muscleGroup}
Difficulty: ${difficulty}
Goal: ${goal}
Available Equipment: ${equipment}

Return ONLY valid JSON.
Do not use markdown.
Do not use code blocks.

Use exactly this structure:

{
  "workoutName": "string",
  "description": "string",
  "muscleGroup": "string",
  "difficulty": "string",
  "exercises": [
    {
      "name": "string",
      "sets": number,
      "reps": number,
      "restTime": number,
      "instructions": "string"
    }
  ]
}

Rules:
- Generate 4 to 6 exercises.
- Sets should normally be between 2 and 4.
- Reps should normally be between 6 and 15.
- Rest time must be in seconds.
- Exercises must match the selected muscle group.
- Exercises must match the available equipment.
- Keep the workout realistic for the selected difficulty.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      systemInstruction: `
        You are IronMind AI Workout Generator.

        Generate practical and structured gym workouts.
        Keep recommendations appropriate for the selected
        difficulty and equipment.
      `,
    },
  });

  const text = response.text;

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Invalid AI workout JSON:", text);
    throw new Error("AI returned an invalid workout format");
  }
};