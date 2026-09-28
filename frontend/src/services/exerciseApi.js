import api from "./api";

// CREATE EXERCISE
export const createExercise = (exerciseData) => {
  return api.post("/exercises", exerciseData);
};

// GET ALL EXERCISES
export const getExercises = () => {
  return api.get("/exercises");
};

// GET SINGLE EXERCISE
export const getExerciseById = (exerciseId) => {
  return api.get(`/exercises/${exerciseId}`);
};

// UPDATE EXERCISE
export const updateExercise = (exerciseId, exerciseData) => {
  return api.put(`/exercises/${exerciseId}`, exerciseData);
};

// DELETE EXERCISE
export const deleteExercise = (exerciseId) => {
  return api.delete(`/exercises/${exerciseId}`);
};