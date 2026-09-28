import api from "./api";

// =========================
// CREATE WORKOUT
// =========================

export const createWorkout = (workoutData) => {
  return api.post("/workouts", workoutData);
};

// =========================
// GET ALL WORKOUTS
// =========================

export const getWorkouts = () => {
  return api.get("/workouts");
};

// =========================
// GET SINGLE WORKOUT
// =========================

export const getWorkoutById = (workoutId) => {
  return api.get(`/workouts/${workoutId}`);
};

// =========================
// UPDATE WORKOUT
// =========================

export const updateWorkout = (workoutId, workoutData) => {
  return api.put(`/workouts/${workoutId}`, workoutData);
};

// =========================
// DELETE WORKOUT
// =========================

export const deleteWorkout = (workoutId) => {
  return api.delete(`/workouts/${workoutId}`);
};

// =========================
// COMPLETE WORKOUT
// =========================

export const completeWorkout = (workoutId, workoutData) => {
  return api.patch(
    `/workouts/${workoutId}/complete`,
    workoutData
  );
};

// =========================
// WORKOUT HISTORY
// =========================

export const getWorkoutHistory = () => {
  return api.get("/workouts/history");
};

// =========================
// LIFETIME PROGRESS
// =========================

export const getWorkoutProgress = () => {
  return api.get("/workouts/progress");
};

// =========================
// WEEKLY PROGRESS
// =========================

export const getWeeklyProgress = () => {
  return api.get("/workouts/progress/weekly");
};

// =========================
// PERSONAL RECORDS
// =========================

export const getPersonalRecords = () => {
  return api.get("/workouts/progress/pr");
};

// =========================
// EXERCISE PROGRESSION
// =========================

export const getExerciseProgression = (exerciseId) => {
  return api.get(
    `/workouts/progress/exercise/${exerciseId}`
  );
};

// =========================
// EXERCISE COMPLETION
// =========================
export const completeWorkoutExercise = (
  workoutId,
  exerciseId
) => {
  return api.patch(
    `/workouts/${workoutId}/exercises/${exerciseId}/complete`
  );
};

// PROGRESS DASHBOARD
export const getProgressDashboard = () => {
  return api.get("/workouts/progress/dashboard");
};

// =========================
// REMOVE EXERCISE FROM WORKOUT
// =========================

export const removeWorkoutExercise = (
  workoutId,
  exerciseId
) => {
  return api.delete(
    `/workouts/${workoutId}/exercises/${exerciseId}`
  );
};