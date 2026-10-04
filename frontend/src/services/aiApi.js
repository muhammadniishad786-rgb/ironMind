import api from "./api";

// =====================================================
// AI WORKOUT GENERATOR
// =====================================================

export const generateAIWorkout = async (workoutData) => {
  const response = await api.post(
    "/ai/generate-workout",
    workoutData
  );

  return response.data;
};

// =====================================================
// AI CHAT
// =====================================================

export const askAI = async (message) => {
  const response = await api.post("/ai/chat", {
    message,
  });

  return response.data;
};

// =====================================================
// SAVE AI WORKOUT
// =====================================================

export const saveAIWorkout = async (workoutData) => {
  const response = await api.post(
    "/ai/save-workout",
    workoutData
  );

  return response.data;
};

// =====================================================
// AI PROGRESSION
// =====================================================

export const getAIProgression = async (exerciseId) => {
  const response = await api.post(
    "/ai/progression",
    {
      exerciseId,
    }
  );

  return response.data;
};