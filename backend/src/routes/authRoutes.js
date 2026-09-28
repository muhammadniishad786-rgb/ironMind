import express from "express";

import {
  loginUser,
  registerUser,
  getProfile,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

export default router;