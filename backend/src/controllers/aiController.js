import {
  generateAIResponse,
  generateWorkout,
} from "../services/aiService.js";

// General AI Chat
export const askAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const answer = await generateAIResponse(message);

    res.status(200).json({
      message: answer,
    });
  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      message: "Failed to generate AI response",
      error: error.message,
    });
  }
};

// AI Workout Generator
export const createAIWorkout = async (req, res) => {
  try {
    const {
      muscleGroup,
      difficulty,
      goal,
      equipment,
    } = req.body;

    if (!muscleGroup || !difficulty || !goal || !equipment) {
      return res.status(400).json({
        message:
          "muscleGroup, difficulty, goal and equipment are required",
      });
    }

    const workout = await generateWorkout({
      muscleGroup,
      difficulty,
      goal,
      equipment,
    });

    res.status(200).json({
      message: "Workout generated successfully",
      workout,
    });
  } catch (error) {
    console.error("AI Workout Error:", error);

    res.status(500).json({
      message: "Failed to generate AI workout",
      error: error.message,
    });
  }
};