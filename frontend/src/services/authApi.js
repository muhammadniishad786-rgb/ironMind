import api from "./api";

// =========================
// REGISTER
// =========================

export const registerUser = (userData) => {
  return api.post("/auth/register", userData);
};

// =========================
// LOGIN
// =========================

export const loginUser = (userData) => {
  return api.post("/auth/login", userData);
};

// =========================
// GET PROFILE
// =========================

export const getProfile = () => {
  return api.get("/auth/profile");
};