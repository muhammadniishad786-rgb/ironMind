import express from "express";
import { createExercise, deleteExercise, getExerciseById, getExercises, updateExercise } from "../controllers/exercieseController.js";



const router = express.Router();

router.post("/", createExercise);

router.get("/", getExercises);

router.get("/:id", getExerciseById);

router.put("/:id", updateExercise);

router.delete("/:id", deleteExercise);

export default router;