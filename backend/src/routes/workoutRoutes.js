import express from "express";

import {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
  completeWorkout,
  getWorkoutHistory,
  getWorkoutProgress,
  getWeeklyProgress,
  getPersonalRecords,
  getExerciseProgression,
  getProgressDashboard,
  completeWorkoutExercise,
  removeWorkoutExercise,
} from "../controllers/workoutController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// =========================
// CREATE WORKOUT
// =========================

router.post(
  "/",
  authMiddleware,
  createWorkout
);

// =========================
// GET ALL USER WORKOUTS
// =========================

router.get(
  "/",
  authMiddleware,
  getWorkouts
);

// =========================
// WORKOUT HISTORY
// =========================

router.get(
  "/history",
  authMiddleware,
  getWorkoutHistory
);

// =========================
// WORKOUT PROGRESS
// =========================

router.get(
  "/progress",
  authMiddleware,
  getWorkoutProgress
);

// =========================
// PROGRESS DASHBOARD
// =========================

router.get(
  "/progress/dashboard",
  authMiddleware,
  getProgressDashboard
);

// =========================
// PERSONAL RECORDS
// =========================

router.get(
  "/progress/pr",
  authMiddleware,
  getPersonalRecords
);

// =========================
// WEEKLY PROGRESS
// =========================

router.get(
  "/progress/weekly",
  authMiddleware,
  getWeeklyProgress
);

// =========================
// EXERCISE PROGRESS
// =========================

router.get(
  "/progress/exercise/:exerciseId",
  authMiddleware,
  getExerciseProgression
);

// =========================
// GET SINGLE WORKOUT
// =========================

router.get(
  "/:id",
  authMiddleware,
  getWorkoutById
);

// =========================
// UPDATE WORKOUT
// =========================

router.put(
  "/:id",
  authMiddleware,
  updateWorkout
);

// =========================
// DELETE WORKOUT
// =========================

router.delete(
  "/:id",
  authMiddleware,
  deleteWorkout
);

// =========================
// COMPLETE WORKOUT
// =========================

router.patch(
  "/:id/complete",
  authMiddleware,
  completeWorkout
);

// =========================
// COMPLETE INDIVIDUAL EXERCISE
// =========================

router.patch(
  "/:workoutId/exercises/:exerciseId/complete",
  authMiddleware,
  completeWorkoutExercise
);

// =========================
// REMOVE EXERCISE FROM WORKOUT
// =========================

router.delete(
  "/:workoutId/exercises/:exerciseId",
  authMiddleware,
  removeWorkoutExercise
);

export default router;