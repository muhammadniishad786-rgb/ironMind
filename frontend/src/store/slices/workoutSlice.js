import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getWorkouts as getWorkoutsApi,
  createWorkout as createWorkoutApi,
} from "../../services/workoutApi";

// =========================
// GET WORKOUTS
// =========================

export const getWorkouts = createAsyncThunk(
  "workout/getWorkouts",

  async (_, { rejectWithValue }) => {
    try {
      const response = await getWorkoutsApi();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch workouts"
      );
    }
  }
);

// =========================
// CREATE WORKOUT
// =========================

export const createWorkout = createAsyncThunk(
  "workout/createWorkout",

  async (workoutData, { rejectWithValue }) => {
    try {
      const response = await createWorkoutApi(workoutData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create workout"
      );
    }
  }
);

// =========================
// INITIAL STATE
// =========================

const initialState = {
  workouts: [],

  loading: false,

  error: null,

  createLoading: false,
  createError: null,
  createSuccess: false,
};

// =========================
// SLICE
// =========================

const workoutSlice = createSlice({
  name: "workout",

  initialState,

  reducers: {
    clearWorkoutError: (state) => {
      state.error = null;
      state.createError = null;
    },

    clearCreateSuccess: (state) => {
      state.createSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // GET WORKOUTS
      // =========================

      .addCase(getWorkouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getWorkouts.fulfilled, (state, action) => {
        state.loading = false;

        state.workouts = action.payload.workouts;

        state.error = null;
      })

      .addCase(getWorkouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // CREATE WORKOUT
      // =========================

      .addCase(createWorkout.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
        state.createSuccess = false;
      })

      .addCase(createWorkout.fulfilled, (state, action) => {
        state.createLoading = false;
        state.createSuccess = true;
        state.createError = null;

        // Add newly created workout
        // to existing workout list
        state.workouts.unshift(action.payload.workout);
      })

      .addCase(createWorkout.rejected, (state, action) => {
        state.createLoading = false;
        state.createSuccess = false;
        state.createError = action.payload;
      });
  },
});

// =========================
// ACTIONS
// =========================

export const {
  clearWorkoutError,
  clearCreateSuccess,
} = workoutSlice.actions;

// =========================
// REDUCER
// =========================

export default workoutSlice.reducer;