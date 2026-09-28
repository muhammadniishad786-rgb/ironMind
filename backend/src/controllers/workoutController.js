import Workout from "../models/workoutModel.js";

// =========================
// CREATE WORKOUT
// =========================

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

    return res.status(201).json({
      message: "Workout created successfully",
      workout: populatedWorkout,
    });
  } catch (error) {
    console.error("Create workout error:", error);

    return res.status(500).json({
      message: "Failed to create workout",
      error: error.message,
    });
  }
};

// =========================
// GET ALL WORKOUTS
// =========================

export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({
      user: req.user.userId,
    })
      .populate("exercises.exercise")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      workouts,
    });
  } catch (error) {
    console.error("Get workouts error:", error);

    return res.status(500).json({
      message: "Failed to get workouts",
      error: error.message,
    });
  }
};

// =========================
// GET SINGLE WORKOUT
// =========================

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

    return res.status(200).json({
      workout,
    });
  } catch (error) {
    console.error("Get workout error:", error);

    return res.status(500).json({
      message: "Failed to get workout",
      error: error.message,
    });
  }
};

// =========================
// UPDATE WORKOUT
// =========================

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

    if (name !== undefined) {
      workout.name = name;
    }

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

    return res.status(200).json({
      message: "Workout updated successfully",
      workout: populatedWorkout,
    });
  } catch (error) {
    console.error("Update workout error:", error);

    return res.status(500).json({
      message: "Failed to update workout",
      error: error.message,
    });
  }
};

// =========================
// DELETE WORKOUT
// =========================

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

    return res.status(200).json({
      message: "Workout deleted successfully",
    });
  } catch (error) {
    console.error("Delete workout error:", error);

    return res.status(500).json({
      message: "Failed to delete workout",
      error: error.message,
    });
  }
};

// =========================
// COMPLETE WORKOUT
// =========================

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

    // Save performed sets for each exercise
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

        // Save actual performed sets
        if (
          Array.isArray(
            performedExercise.performedSets
          )
        ) {
          workoutExercise.performedSets =
            performedExercise.performedSets;
        }

        // Mark exercise as completed
        workoutExercise.completed = true;
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

    const populatedWorkout =
      await workout.populate(
        "exercises.exercise"
      );

    return res.status(200).json({
      message: "Workout completed successfully",
      workout: populatedWorkout,
    });
  } catch (error) {
    console.error("Complete workout error:", error);

    return res.status(500).json({
      message: "Failed to complete workout",
      error: error.message,
    });
  }
};

// =========================
// GET WORKOUT HISTORY
// =========================

export const getWorkoutHistory = async (req, res) => {
  try {
    const workouts = await Workout.find({
      user: req.user.userId,
      completed: true,
    })
      .populate("exercises.exercise")
      .sort({ completedAt: -1 });

    return res.status(200).json({
      workouts,
    });
  } catch (error) {
    console.error("Get workout history error:", error);

    return res.status(500).json({
      message: "Failed to get workout history",
      error: error.message,
    });
  }
};

// =========================
// GET WORKOUT PROGRESS
// =========================

export const getWorkoutProgress = async (req, res) => {
  try {
    const workouts = await Workout.find({
      user: req.user.userId,
      completed: true,
    })
      .populate("exercises.exercise")
      .sort({ completedAt: -1 });

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
      totalDuration += workout.duration || 0;

      workout.exercises.forEach((workoutExercise) => {
        const exercise = workoutExercise.exercise;

        if (!exercise) {
          return;
        }

        const exerciseName = exercise.name;
        const muscleGroup = exercise.muscleGroup;

        if (muscleGroup) {
          muscleGroups[muscleGroup] =
            (muscleGroups[muscleGroup] || 0) + 1;
        }

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

          if (
            weight >
            exerciseStats[exerciseName].maxWeight
          ) {
            exerciseStats[exerciseName].maxWeight =
              weight;
          }
        });
      });
    });

    const averageWorkoutDuration =
      Math.round(totalDuration / workouts.length);

    const recentWorkouts = workouts
      .slice(0, 5)
      .map((workout) => ({
        _id: workout._id,
        name: workout.name,
        duration: workout.duration,
        completedAt: workout.completedAt,
      }));

    return res.status(200).json({
      totalWorkouts: workouts.length,
      totalDuration,
      averageWorkoutDuration,
      totalVolume,
      muscleGroups,
      exercises: exerciseStats,
      recentWorkouts,
    });
  } catch (error) {
    console.error("Get workout progress error:", error);

    return res.status(500).json({
      message: "Failed to get workout progress",
      error: error.message,
    });
  }
};

// =========================
// GET WEEKLY PROGRESS
// =========================

export const getWeeklyProgress = async (req, res) => {
  try {
    const now = new Date();

    const currentDay = now.getUTCDay();

    const daysFromMonday =
      currentDay === 0 ? 6 : currentDay - 1;

    // Monday 00:00 UTC
    const startOfThisWeek = new Date(now);

    startOfThisWeek.setUTCDate(
      startOfThisWeek.getUTCDate() -
        daysFromMonday
    );

    startOfThisWeek.setUTCHours(
      0,
      0,
      0,
      0
    );

    // Previous Monday
    const startOfLastWeek =
      new Date(startOfThisWeek);

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

    // Monday -> Sunday
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfThisWeek);

      date.setUTCDate(
        date.getUTCDate() + i
      );

      const dateKey =
        date.toISOString().split("T")[0];

      dailyWorkouts[dateKey] = {
        date: dateKey,
        workouts: 0,
        duration: 0,
        volume: 0,
      };
    }

    workouts.forEach((workout) => {
      const completedDate =
        new Date(workout.completedAt);

      let workoutVolume = 0;

      workout.exercises.forEach(
        (workoutExercise) => {
          workoutExercise.performedSets.forEach(
            (set) => {
              if (!set.completed) {
                return;
              }

              workoutVolume +=
                (set.reps || 0) *
                (set.weight || 0);
            }
          );
        }
      );

      // This week
      if (completedDate >= startOfThisWeek) {
        thisWeek.workouts += 1;

        thisWeek.duration +=
          workout.duration || 0;

        thisWeek.volume +=
          workoutVolume;

        const dateKey =
          completedDate
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

      // Last week
      else if (
        completedDate >= startOfLastWeek &&
        completedDate < startOfThisWeek
      ) {
        lastWeek.workouts += 1;

        lastWeek.duration +=
          workout.duration || 0;

        lastWeek.volume +=
          workoutVolume;
      }
    });

    return res.status(200).json({
      thisWeek,
      lastWeek,
      dailyWorkouts:
        Object.values(dailyWorkouts),
    });
  } catch (error) {
    console.error("Get weekly progress error:", error);

    return res.status(500).json({
      message: "Failed to get weekly progress",
      error: error.message,
    });
  }
};

// =========================
// GET PERSONAL RECORDS
// =========================

export const getPersonalRecords = async (req, res) => {
  try {
    const workouts = await Workout.find({
      user: req.user.userId,
      completed: true,
    }).populate("exercises.exercise");

    const personalRecords = {};

    workouts.forEach((workout) => {
      workout.exercises.forEach((workoutExercise) => {
        const exercise = workoutExercise.exercise;

        if (!exercise) {
          return;
        }

        const exerciseId =
          exercise._id.toString();

        const exerciseName =
          exercise.name;

        if (!personalRecords[exerciseId]) {
          personalRecords[exerciseId] = {
            exerciseId: exercise._id,
            exerciseName,
            muscleGroup:
              exercise.muscleGroup,
            maxWeight: 0,
            maxWeightReps: 0,
            totalVolume: 0,
            achievedAt: null,
          };
        }

        workoutExercise.performedSets.forEach(
          (set) => {
            if (!set.completed) {
              return;
            }

            const weight = set.weight || 0;
            const reps = set.reps || 0;
            const volume = weight * reps;

            personalRecords[
              exerciseId
            ].totalVolume += volume;

            if (
              weight >
              personalRecords[exerciseId]
                .maxWeight
            ) {
              personalRecords[
                exerciseId
              ].maxWeight = weight;

              personalRecords[
                exerciseId
              ].maxWeightReps = reps;

              personalRecords[
                exerciseId
              ].achievedAt =
                workout.completedAt;
            }
          }
        );
      });
    });

    return res.status(200).json({
      personalRecords:
        Object.values(personalRecords),
    });
  } catch (error) {
    console.error(
      "Get personal records error:",
      error
    );

    return res.status(500).json({
      message: "Failed to get personal records",
      error: error.message,
    });
  }
};

// =========================
// GET EXERCISE PROGRESSION
// =========================

export const getExerciseProgression = async (
  req,
  res
) => {
  try {
    const { exerciseId } = req.params;

    const workouts = await Workout.find({
      user: req.user.userId,
      completed: true,
      "exercises.exercise": exerciseId,
    })
      .populate("exercises.exercise")
      .sort({ completedAt: 1 });

    if (workouts.length === 0) {
      return res.status(404).json({
        message:
          "No progression data found for this exercise",
      });
    }

    let exerciseName = "";
    let muscleGroup = "";

    const progress = [];

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

      workoutExercise.performedSets.forEach(
        (set) => {
          if (!set.completed) {
            return;
          }

          const weight = set.weight || 0;
          const reps = set.reps || 0;

          totalReps += reps;

          totalVolume +=
            weight * reps;

          if (weight > maxWeight) {
            maxWeight = weight;
          }
        }
      );

      progress.push({
        workoutId: workout._id,
        workoutName: workout.name,
        date: workout.completedAt,
        maxWeight,
        totalReps,
        totalVolume,
      });
    });

    return res.status(200).json({
      exercise: {
        exerciseId,
        name: exerciseName,
        muscleGroup,
      },
      progress,
    });
  } catch (error) {
    console.error(
      "Get exercise progression error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to get exercise progression",
      error: error.message,
    });
  }
};

// =========================
// COMPLETE INDIVIDUAL EXERCISE
// =========================

export const completeWorkoutExercise = async (
  req,
  res
) => {
  try {
    const {
      workoutId,
      exerciseId,
    } = req.params;

    const workout = await Workout.findOne({
      _id: workoutId,
      user: req.user.userId,
    });

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    const workoutExercise =
      workout.exercises.find(
        (item) =>
          item.exercise.toString() ===
          exerciseId
      );

    if (!workoutExercise) {
      return res.status(404).json({
        message:
          "Exercise not found in this workout",
      });
    }

    workoutExercise.completed = true;

    await workout.save();

    const populatedWorkout =
      await workout.populate(
        "exercises.exercise"
      );

    return res.status(200).json({
      message:
        "Exercise completed successfully",
      workout: populatedWorkout,
    });
  } catch (error) {
    console.error(
      "Complete workout exercise error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to complete exercise",
      error: error.message,
    });
  }
};

// =========================
// REMOVE EXERCISE FROM WORKOUT
// =========================

export const removeWorkoutExercise = async (
  req,
  res
) => {
  try {
    const {
      workoutId,
      exerciseId,
    } = req.params;

    const workout = await Workout.findOne({
      _id: workoutId,
      user: req.user.userId,
    });

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    const exerciseIndex =
      workout.exercises.findIndex(
        (item) =>
          item.exercise.toString() ===
          exerciseId
      );

    if (exerciseIndex === -1) {
      return res.status(404).json({
        message:
          "Exercise not found in this workout",
      });
    }

    workout.exercises.splice(
      exerciseIndex,
      1
    );

    await workout.save();

    const populatedWorkout =
      await workout.populate(
        "exercises.exercise"
      );

    return res.status(200).json({
      message:
        "Exercise removed successfully",
      workout: populatedWorkout,
    });
  } catch (error) {
    console.error(
      "Remove workout exercise error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to remove exercise",
      error: error.message,
    });
  }
};

// =========================
// PROGRESS DASHBOARD
// =========================

export const getProgressDashboard = async (
  req,
  res
) => {
  try {
    const workouts = await Workout.find({
      user: req.user.userId,
      completed: true,
    })
      .populate("exercises.exercise")
      .sort({ completedAt: -1 });

    // =========================
    // NO COMPLETED WORKOUTS
    // =========================

    if (workouts.length === 0) {
      return res.status(200).json({
        overview: {
          totalWorkouts: 0,
          totalDuration: 0,
          totalVolume: 0,
          totalSets: 0,
          totalReps: 0,
        },

        thisWeek: {
          workouts: 0,
          duration: 0,
          volume: 0,
        },

        lastWeek: {
          workouts: 0,
          duration: 0,
          volume: 0,
        },

        muscleGroups: {},
        topExercises: [],
        recentWorkouts: [],
      });
    }

    // =========================
    // OVERVIEW
    // =========================

    let totalDuration = 0;
    let totalVolume = 0;
    let totalSets = 0;
    let totalReps = 0;

    const muscleGroups = {};
    const exerciseStats = {};

    workouts.forEach((workout) => {
      totalDuration +=
        workout.duration || 0;

      workout.exercises.forEach(
        (workoutExercise) => {
          const exercise =
            workoutExercise.exercise;

          if (!exercise) {
            return;
          }

          const exerciseId =
            exercise._id.toString();

          const exerciseName =
            exercise.name;

          const muscleGroup =
            exercise.muscleGroup;

          // Muscle group count
          if (muscleGroup) {
            muscleGroups[muscleGroup] =
              (muscleGroups[muscleGroup] ||
                0) + 1;
          }

          // Exercise statistics
          if (
            !exerciseStats[exerciseId]
          ) {
            exerciseStats[exerciseId] = {
              exerciseId:
                exercise._id,
              exerciseName,
              muscleGroup,
              totalSets: 0,
              totalReps: 0,
              totalVolume: 0,
              maxWeight: 0,
            };
          }

          workoutExercise.performedSets.forEach(
            (set) => {
              if (!set.completed) {
                return;
              }

              const reps =
                set.reps || 0;

              const weight =
                set.weight || 0;

              const volume =
                reps * weight;

              totalSets += 1;
              totalReps += reps;
              totalVolume += volume;

              exerciseStats[
                exerciseId
              ].totalSets += 1;

              exerciseStats[
                exerciseId
              ].totalReps += reps;

              exerciseStats[
                exerciseId
              ].totalVolume +=
                volume;

              if (
                weight >
                exerciseStats[
                  exerciseId
                ].maxWeight
              ) {
                exerciseStats[
                  exerciseId
                ].maxWeight =
                  weight;
              }
            }
          );
        }
      );
    });

    // =========================
    // WEEK CALCULATION
    // =========================

    const now = new Date();

    const currentDay =
      now.getUTCDay();

    const daysFromMonday =
      currentDay === 0
        ? 6
        : currentDay - 1;

    // Current week Monday
    const startOfThisWeek =
      new Date(now);

    startOfThisWeek.setUTCDate(
      startOfThisWeek.getUTCDate() -
        daysFromMonday
    );

    startOfThisWeek.setUTCHours(
      0,
      0,
      0,
      0
    );

    // Previous week Monday
    const startOfLastWeek =
      new Date(
        startOfThisWeek
      );

    startOfLastWeek.setUTCDate(
      startOfLastWeek.getUTCDate() -
        7
    );

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

    workouts.forEach((workout) => {
      const completedDate =
        new Date(
          workout.completedAt
        );

      let workoutVolume = 0;

      workout.exercises.forEach(
        (workoutExercise) => {
          workoutExercise.performedSets.forEach(
            (set) => {
              if (!set.completed) {
                return;
              }

              workoutVolume +=
                (set.reps || 0) *
                (set.weight || 0);
            }
          );
        }
      );

      // This week
      if (
        completedDate >=
        startOfThisWeek
      ) {
        thisWeek.workouts += 1;

        thisWeek.duration +=
          workout.duration || 0;

        thisWeek.volume +=
          workoutVolume;
      }

      // Previous week
      else if (
        completedDate >=
          startOfLastWeek &&
        completedDate <
          startOfThisWeek
      ) {
        lastWeek.workouts += 1;

        lastWeek.duration +=
          workout.duration || 0;

        lastWeek.volume +=
          workoutVolume;
      }
    });

    // =========================
    // TOP EXERCISES
    // =========================

    const topExercises =
      Object.values(
        exerciseStats
      )
        .sort(
          (a, b) =>
            b.totalVolume -
            a.totalVolume
        )
        .slice(0, 5);

    // =========================
    // RECENT WORKOUTS
    // =========================

    const recentWorkouts =
      workouts
        .slice(0, 5)
        .map((workout) => ({
          _id: workout._id,
          name: workout.name,
          duration:
            workout.duration,
          completedAt:
            workout.completedAt,
        }));

    // =========================
    // RESPONSE
    // =========================

    return res.status(200).json({
      overview: {
        totalWorkouts:
          workouts.length,
        totalDuration,
        totalVolume,
        totalSets,
        totalReps,
      },

      thisWeek,

      lastWeek,

      muscleGroups,

      topExercises,

      recentWorkouts,
    });
  } catch (error) {
    console.error(
      "Progress dashboard error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to get progress dashboard",
      error: error.message,
    });
  }
};