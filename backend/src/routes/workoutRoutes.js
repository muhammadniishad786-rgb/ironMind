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
} from "../controllers/workoutController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create workout
router.post("/", authMiddleware, createWorkout);

// Get all logged-in user's workouts
router.get("/", authMiddleware, getWorkouts);

// completed workout history
router.get("/history", authMiddleware, getWorkoutHistory);

// workout progress
router.get("/progress", authMiddleware, getWorkoutProgress);

// get weekly progress
router.get("/progress/weekly", authMiddleware, getWeeklyProgress);

// Get single workout
router.get("/:id", authMiddleware, getWorkoutById);

// Update workout
router.put("/:id", authMiddleware, updateWorkout);

// Delete workout
router.delete("/:id", authMiddleware, deleteWorkout);

// Complete workout
router.patch("/:id/complete", authMiddleware, completeWorkout);

export default router;
