import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  registerUser as registerUserApi,
  loginUser as loginUserApi,
  getProfile as getProfileApi,
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
      return rejectWithValue(
        error.response?.data?.message || "Login failed",
      );
    }
  },
);

// =========================
// GET PROFILE
// =========================

export const getProfile = createAsyncThunk(
  "auth/getProfile",

  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfileApi();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile",
      );
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

  profileLoading: false,
  profileError: null,
};

// =========================
// SLICE
// =========================

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    // =========================
    // LOGOUT
    // =========================

    logout: (state) => {
      state.token = null;
      state.user = null;

      state.isAuthenticated = false;

      state.loginSuccess = false;
      state.registerSuccess = false;

      state.error = null;
      state.profileError = null;

      localStorage.removeItem("token");
    },

    // =========================
    // CLEAR AUTH ERROR
    // =========================

    clearAuthError: (state) => {
      state.error = null;
    },

    // =========================
    // CLEAR REGISTER SUCCESS
    // =========================

    clearRegisterSuccess: (state) => {
      state.registerSuccess = false;
    },

    // =========================
    // CLEAR LOGIN SUCCESS
    // =========================

    clearLoginSuccess: (state) => {
      state.loginSuccess = false;
    },

    // =========================
    // CLEAR PROFILE ERROR
    // =========================

    clearProfileError: (state) => {
      state.profileError = null;
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

        state.loading = false;
        state.loginSuccess = true;
        state.error = null;

        state.token = token;
        state.user = user || null;
        state.isAuthenticated = true;

        localStorage.setItem("token", token);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginSuccess = false;
        state.error = action.payload;
      });

    // =========================
    // GET PROFILE
    // =========================

    builder
      .addCase(getProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profileError = null;

        state.user = action.payload.user || action.payload;

        state.isAuthenticated = true;
      })

      .addCase(getProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload;

        // Token is invalid/expired
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;

        localStorage.removeItem("token");
      });
  },
});

// =========================
// ACTIONS
// =========================

export const {
  logout,
  clearAuthError,
  clearRegisterSuccess,
  clearLoginSuccess,
  clearProfileError,
} = authSlice.actions;

// =========================
// REDUCER
// =========================

export default authSlice.reducer;