import Exercise from "../models/exerciseModel.js";
import Workout from "../models/workoutModel.js";
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

// =========================
// SAVE AI GENERATED WORKOUT
// =========================

export const saveAIWorkout = async (req, res) => {
  try {
    const {
      workoutName,
      description,
      exercises,
    } = req.body;

    if (
      !workoutName ||
      !Array.isArray(exercises) ||
      exercises.length === 0
    ) {
      return res.status(400).json({
        message:
          "Workout name and exercises are required",
      });
    }

    const workoutExercises = [];

    const missingExercises = [];

    // Find each AI-generated exercise
    for (const aiExercise of exercises) {
      if (!aiExercise.name) {
        continue;
      }

      const exercise = await Exercise.findOne({
        name: {
          $regex: `^${aiExercise.name.trim()}$`,
          $options: "i",
        },
      });

      if (!exercise) {
        missingExercises.push(aiExercise.name);
        continue;
      }

      workoutExercises.push({
        exercise: exercise._id,
        sets: aiExercise.sets || 3,
        reps: aiExercise.reps || 10,
        restTime: aiExercise.restTime || 60,
      });
    }

    // If some exercises don't exist in database
    if (missingExercises.length > 0) {
      return res.status(400).json({
        message:
          "Some AI exercises were not found in your exercise library",
        missingExercises,
      });
    }

    const workout = await Workout.create({
      user: req.user.userId,
      name: workoutName,
      description,
      exercises: workoutExercises,
      duration: 0,
    });

    const populatedWorkout =
      await workout.populate(
        "exercises.exercise"
      );

    return res.status(201).json({
      message:
        "AI workout saved successfully",
      workout: populatedWorkout,
    });
  } catch (error) {
    console.error(
      "Save AI workout error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to save AI workout",
      error: error.message,
    });
  }
};