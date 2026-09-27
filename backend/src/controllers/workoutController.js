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

// Get workout progress
export const getWorkoutProgress = async (req, res) => {
  try {
    const workouts = await Workout.find({
      user: req.user.userId,
      completed: true,
    })
      .populate("exercises.exercise")
      .sort({ completedAt: -1 });

    // No completed workouts
    if (workouts.length === 0) {
      return res.status(200).json({
        totalWorkouts: 0,
        totalDuration: 0,
        averageWorkoutDuration: 0,
        totalVolume: 0,
        muscleGroups: {},
        exercises: {},
        recentWorkouts: [],
      });
    }

    let totalDuration = 0;
    let totalVolume = 0;

    const muscleGroups = {};
    const exerciseStats = {};

    workouts.forEach((workout) => {
      // Total workout duration
      totalDuration += workout.duration || 0;

      workout.exercises.forEach((workoutExercise) => {
        const exercise = workoutExercise.exercise;

        if (!exercise) {
          return;
        }

        const exerciseName = exercise.name;
        const muscleGroup = exercise.muscleGroup;

        // Count muscle groups
        if (muscleGroup) {
          muscleGroups[muscleGroup] =
            (muscleGroups[muscleGroup] || 0) + 1;
        }

        // Create exercise statistics
        if (!exerciseStats[exerciseName]) {
          exerciseStats[exerciseName] = {
            exerciseId: exercise._id,
            muscleGroup,
            totalSets: 0,
            totalReps: 0,
            totalVolume: 0,
            maxWeight: 0,
          };
        }

        // Process performed sets
        workoutExercise.performedSets.forEach((set) => {
          if (!set.completed) {
            return;
          }

          const reps = set.reps || 0;
          const weight = set.weight || 0;

          const volume = reps * weight;

          totalVolume += volume;

          exerciseStats[exerciseName].totalSets += 1;
          exerciseStats[exerciseName].totalReps += reps;
          exerciseStats[exerciseName].totalVolume += volume;

          if (weight > exerciseStats[exerciseName].maxWeight) {
            exerciseStats[exerciseName].maxWeight = weight;
          }
        });
      });
    });

    const averageWorkoutDuration =
      Math.round(totalDuration / workouts.length);

    // Return recent workouts
    const recentWorkouts = workouts.slice(0, 5).map((workout) => ({
      _id: workout._id,
      name: workout.name,
      duration: workout.duration,
      completedAt: workout.completedAt,
    }));

    res.status(200).json({
      totalWorkouts: workouts.length,
      totalDuration,
      averageWorkoutDuration,
      totalVolume,
      muscleGroups,
      exercises: exerciseStats,
      recentWorkouts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get workout progress",
      error: error.message,
    });
  }
};

// Get weekly workout progress
// Get weekly workout progress
export const getWeeklyProgress = async (req, res) => {
  try {
    const now = new Date();

    // Get current day in UTC
    const currentDay = now.getUTCDay();

    // Monday = 1, Sunday = 0
    const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1;

    // Start of current week - Monday 00:00 UTC
    const startOfThisWeek = new Date(now);

    startOfThisWeek.setUTCDate(
      startOfThisWeek.getUTCDate() - daysFromMonday
    );

    startOfThisWeek.setUTCHours(0, 0, 0, 0);

    // Start of previous week
    const startOfLastWeek = new Date(startOfThisWeek);

    startOfLastWeek.setUTCDate(
      startOfLastWeek.getUTCDate() - 7
    );

    const workouts = await Workout.find({
      user: req.user.userId,
      completed: true,
      completedAt: {
        $gte: startOfLastWeek,
        $lte: now,
      },
    })
      .populate("exercises.exercise")
      .sort({ completedAt: -1 });

    const thisWeek = {
      workouts: 0,
      duration: 0,
      volume: 0,
    };

    const lastWeek = {
      workouts: 0,
      duration: 0,
      volume: 0,
    };

    const dailyWorkouts = {};

    // Create Monday -> Sunday
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfThisWeek);

      date.setUTCDate(
        date.getUTCDate() + i
      );

      const dateKey = date.toISOString().split("T")[0];

      dailyWorkouts[dateKey] = {
        date: dateKey,
        workouts: 0,
        duration: 0,
        volume: 0,
      };
    }

    // Calculate statistics
    workouts.forEach((workout) => {
      const completedDate = new Date(workout.completedAt);

      let workoutVolume = 0;

      workout.exercises.forEach((workoutExercise) => {
        workoutExercise.performedSets.forEach((set) => {
          if (!set.completed) {
            return;
          }

          workoutVolume +=
            (set.reps || 0) * (set.weight || 0);
        });
      });

      // Current week
      if (completedDate >= startOfThisWeek) {
        thisWeek.workouts += 1;
        thisWeek.duration += workout.duration || 0;
        thisWeek.volume += workoutVolume;

        const dateKey = completedDate
          .toISOString()
          .split("T")[0];

        if (dailyWorkouts[dateKey]) {
          dailyWorkouts[dateKey].workouts += 1;

          dailyWorkouts[dateKey].duration +=
            workout.duration || 0;

          dailyWorkouts[dateKey].volume +=
            workoutVolume;
        }
      }

      // Previous week
      else {
        lastWeek.workouts += 1;
        lastWeek.duration += workout.duration || 0;
        lastWeek.volume += workoutVolume;
      }
    });

    res.status(200).json({
      thisWeek,
      lastWeek,
      dailyWorkouts: Object.values(dailyWorkouts),
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get weekly progress",
      error: error.message,
    });
  }
};