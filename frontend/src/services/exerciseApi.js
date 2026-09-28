import api from "./api";

// =========================
// GET ALL EXERCISES
// =========================

export const getExercises = () => {
  return api.get("/exercises");
};