import api from "./api";

export const generateAIWorkout = async (workoutData) => {
  const response = await api.post(
    "/ai/generate-workout",
    workoutData
  );

  return response.data;
};

export const askAI = async (message) => {
  const response = await api.post("/ai/chat", {
    message,
  });

  return response.data;
};

export const saveAIWorkout = async (workoutData) => {
  const response = await api.post(
    "/ai/save-workout",
    workoutData
  );

  return response.data;
};