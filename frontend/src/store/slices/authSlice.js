import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  registerUser as registerUserApi,
  loginUser as loginUserApi,
} from "../../services/authApi";

// Get token from localStorage when app starts
const token = localStorage.getItem("token");

// =========================
// REGISTER
// =========================

export const registerUser = createAsyncThunk(
  "auth/registerUser",

  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

// =========================
// LOGIN
// =========================

export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

// =========================
// INITIAL STATE
// =========================

const initialState = {
  token: token || null,
  user: null,

  isAuthenticated: !!token,

  loading: false,
  error: null,

  registerSuccess: false,
  loginSuccess: false,
};

// =========================
// SLICE
// =========================

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      state.loginSuccess = false;
      state.registerSuccess = false;
      state.error = null;

      localStorage.removeItem("token");
    },

    clearAuthError: (state) => {
      state.error = null;
    },

    clearRegisterSuccess: (state) => {
      state.registerSuccess = false;
    },

    clearLoginSuccess: (state) => {
      state.loginSuccess = false;
    },
  },

  extraReducers: (builder) => {
    // =========================
    // REGISTER
    // =========================

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registerSuccess = false;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registerSuccess = true;
        state.error = null;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registerSuccess = false;
        state.error = action.payload;
      });

    // =========================
    // LOGIN
    // =========================

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.loginSuccess = false;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        const { token, user } = action.payload;

        console.log("Token received:", token);

        state.loading = false;
        state.loginSuccess = true;
        state.error = null;

        state.token = token;
        state.user = user || null;
        state.isAuthenticated = true;

        localStorage.setItem("token", token);

        console.log("Token stored:", localStorage.getItem("token"));
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginSuccess = false;
        state.error = action.payload;
      });
  },
});

export const {
  logout,
  clearAuthError,
  clearRegisterSuccess,
  clearLoginSuccess,
} = authSlice.actions;

export default authSlice.reducer;
