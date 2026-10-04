import Exercise from "../models/exerciseModel.js";
import Workout from "../models/workoutModel.js";

import {
  generateAIResponse,
  generateWorkout,
} from "../services/aiService.js";

// =====================================================
// GENERAL AI CHAT
// =====================================================

export const askAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const answer =
      await generateAIResponse(message);

    return res.status(200).json({
      message: answer,
    });
  } catch (error) {
    console.error("AI Error:", error);

    return res.status(500).json({
      message: "Failed to generate AI response",
      error: error.message,
    });
  }
};

// =====================================================
// AI WORKOUT GENERATOR
// =====================================================

export const createAIWorkout = async (req, res) => {
  try {
    const {
      muscleGroup,
      difficulty,
      goal,
      equipment,
    } = req.body;

    // -------------------------------------------------
    // Validate request
    // -------------------------------------------------

    if (
      !muscleGroup ||
      !difficulty ||
      !goal ||
      !Array.isArray(equipment) ||
      equipment.length === 0
    ) {
      return res.status(400).json({
        message:
          "muscleGroup, difficulty, goal and at least one equipment type are required",
      });
    }

    // -------------------------------------------------
    // Generate workout
    // -------------------------------------------------

    const workout = await generateWorkout({
      muscleGroup,
      difficulty,
      goal,
      equipment,
    });

    return res.status(200).json({
      message: "Workout generated successfully",
      workout,
    });
  } catch (error) {
    console.error(
      "AI Workout Error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to generate AI workout",
      error: error.message,
    });
  }
};

// =====================================================
// SAVE AI GENERATED WORKOUT
// =====================================================

export const saveAIWorkout = async (req, res) => {
  try {
    const {
      workoutName,
      description,
      exercises,
    } = req.body;

    // -------------------------------------------------
    // Validate workout
    // -------------------------------------------------

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

    // -------------------------------------------------
    // Get exercise IDs
    // -------------------------------------------------

    const exerciseIds = exercises.map(
      (exercise) =>
        exercise.exerciseId
    );

    // -------------------------------------------------
    // Validate exercise IDs
    // -------------------------------------------------

    const existingExercises =
      await Exercise.find({
        _id: {
          $in: exerciseIds,
        },
      });

    if (
      existingExercises.length !==
      exerciseIds.length
    ) {
      return res.status(400).json({
        message:
          "Some exercises were not found",
      });
    }

    // -------------------------------------------------
    // Create workout exercises
    // -------------------------------------------------

    const workoutExercises =
      exercises.map((exercise) => ({
        exercise:
          exercise.exerciseId,

        sets:
          exercise.sets,

        reps:
          exercise.reps,

        restTime:
          exercise.restTime,
      }));

    // -------------------------------------------------
    // Create workout
    // -------------------------------------------------

    const workout =
      await Workout.create({
        user: req.user.userId,

        name: workoutName,

        description:
          description || "",

        exercises:
          workoutExercises,
      });

    // -------------------------------------------------
    // Populate exercise details
    // -------------------------------------------------

    const populatedWorkout =
      await workout.populate(
        "exercises.exercise"
      );

    // -------------------------------------------------
    // Response
    // -------------------------------------------------

    return res.status(201).json({
      message:
        "AI workout saved successfully",

      workout:
        populatedWorkout,
    });
  } catch (error) {
    console.error(
      "Save AI workout error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to save AI workout",

      error:
        error.message,
    });
  }
};

// =====================================================
// AI PROGRESSION
// =====================================================

export const getAIProgression = async (
  req,
  res
) => {
  try {
    const {
      exerciseId,
    } = req.body;

    if (!exerciseId) {
      return res.status(400).json({
        message:
          "Exercise ID is required",
      });
    }

    // -----------------------------------------
    // Get user's completed workout history
    // -----------------------------------------

    const workouts =
      await Workout.find({
        user: req.user.userId,
        completed: true,
        "exercises.exercise":
          exerciseId,
      })
        .populate(
          "exercises.exercise"
        )
        .sort({
          completedAt: 1,
        });

    if (workouts.length === 0) {
      return res.status(404).json({
        message:
          "Not enough workout history for AI progression",
      });
    }

    // -----------------------------------------
    // Extract exercise history
    // -----------------------------------------

    const history = [];

    let exerciseName = "";
    let muscleGroup = "";

    workouts.forEach((workout) => {
      const workoutExercise =
        workout.exercises.find(
          (item) =>
            item.exercise &&
            item.exercise._id.toString() ===
              exerciseId
        );

      if (!workoutExercise) {
        return;
      }

      exerciseName =
        workoutExercise.exercise.name;

      muscleGroup =
        workoutExercise.exercise.muscleGroup;

      let maxWeight = 0;
      let totalReps = 0;
      let totalVolume = 0;

      const sets = [];

      workoutExercise.performedSets.forEach(
        (set) => {
          if (!set.completed) {
            return;
          }

          const weight =
            Number(set.weight) || 0;

          const reps =
            Number(set.reps) || 0;

          const volume =
            weight * reps;

          if (weight > maxWeight) {
            maxWeight = weight;
          }

          totalReps += reps;
          totalVolume += volume;

          sets.push({
            setNumber:
              set.setNumber,
            weight,
            reps,
          });
        }
      );

      if (sets.length === 0) {
        return;
      }

      history.push({
        date: workout.completedAt,
        workoutName:
          workout.name,
        maxWeight,
        totalReps,
        totalVolume,
        sets,
      });
    });

    if (history.length === 0) {
      return res.status(404).json({
        message:
          "No completed performance data found for this exercise",
      });
    }

    // -----------------------------------------
    // Keep recent history
    // -----------------------------------------

    const recentHistory =
      history.slice(-5);

    // -----------------------------------------
    // Generate AI progression
    // -----------------------------------------

    const progression =
      await generateProgression({
        exerciseName,
        muscleGroup,
        history:
          recentHistory,
      });

    return res.status(200).json({
      message:
        "AI progression generated successfully",

      progression,

      history:
        recentHistory,
    });
  } catch (error) {
    console.error(
      "AI progression controller error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to generate AI progression",
      error: error.message,
    });
  }
};