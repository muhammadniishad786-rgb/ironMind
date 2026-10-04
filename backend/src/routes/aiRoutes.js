import express from "express";

import {
  askAI,
  createAIWorkout,
} from "../controllers/aiController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// General AI chat
router.post(
  "/chat",
  authMiddleware,
  askAI
);

// AI workout generator
router.post(
  "/generate-workout",
  authMiddleware,
  createAIWorkout
);

export default router;