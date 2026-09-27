import Workout from "../models/workoutModel.js";

// Create workout
export const createWorkout = async (req, res) => {
  try {
    const {
      name,
      description,
      exercises,
      duration,
    } = req.body;

    if (!name || !exercises || exercises.length === 0) {
      return res.status(400).json({
        message: "Workout name and exercises are required",
      });
    }

    const workout = await Workout.create({
      user: req.user.userId,
      name,
      description,
      exercises,
      duration,
    });

    const populatedWorkout = await workout.populate(
      "exercises.exercise"
    );

    res.status(201).json({
      message: "Workout created successfully",
      workout: populatedWorkout,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create workout",
      error: error.message,
    });
  }
};

// Get all workouts of logged-in user
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({
      user: req.user.userId,
    })
      .populate("exercises.exercise")
      .sort({ createdAt: -1 });

    res.status(200).json({
      workouts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get workouts",
      error: error.message,
    });
  }
};

// Get single workout
export const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user.userId,
    }).populate("exercises.exercise");

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    res.status(200).json({
      workout,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get workout",
      error: error.message,
    });
  }
};

// Update workout
export const updateWorkout = async (req, res) => {
  try {
    const {
      name,
      description,
      exercises,
      duration,
    } = req.body;

    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    if (name !== undefined) workout.name = name;
    if (description !== undefined) {
      workout.description = description;
    }
    if (exercises !== undefined) {
      workout.exercises = exercises;
    }
    if (duration !== undefined) {
      workout.duration = duration;
    }

    await workout.save();

    const populatedWorkout = await workout.populate(
      "exercises.exercise"
    );

    res.status(200).json({
      message: "Workout updated successfully",
      workout: populatedWorkout,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update workout",
      error: error.message,
    });
  }
};

// Delete workout
export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    res.status(200).json({
      message: "Workout deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete workout",
      error: error.message,
    });
  }
};

// Mark workout as completed
export const completeWorkout = async (req, res) => {
  try {
    const { duration, exercises } = req.body;

    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    // Save performed sets
    if (Array.isArray(exercises)) {
      for (const performedExercise of exercises) {
        const workoutExercise = workout.exercises.find(
          (item) =>
            item.exercise.toString() ===
            performedExercise.exercise.toString()
        );

        if (!workoutExercise) {
          continue;
        }

        if (Array.isArray(performedExercise.performedSets)) {
          workoutExercise.performedSets =
            performedExercise.performedSets;
        }
      }
    }

    // Save workout duration
    if (duration !== undefined) {
      workout.duration = duration;
    }

    // Mark workout as completed
    workout.completed = true;
    workout.completedAt = new Date();

    await workout.save();

    const populatedWorkout = await workout.populate(
      "exercises.exercise"
    );

    res.status(200).json({
      message: "Workout completed successfully",
      workout: populatedWorkout,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to complete workout",
      error: error.message,
    });
  }
};

// Get completed workout history
export const getWorkoutHistory = async (req, res) => {
  try {
    const workouts = await Workout.find({
      user: req.user.userId,
      completed: true,
    })
      .populate("exercises.exercise")
      .sort({ completedAt: -1 });

    res.status(200).json({
      workouts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get workout history",
      error: error.message,
    });
  }
};