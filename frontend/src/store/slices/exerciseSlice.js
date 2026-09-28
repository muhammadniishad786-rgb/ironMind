import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getExercises as getExercisesApi,
} from "../../services/exerciseApi";

// =========================
// GET EXERCISES
// =========================

export const getExercises = createAsyncThunk(
  "exercise/getExercises",

  async (_, { rejectWithValue }) => {
    try {
      const response = await getExercisesApi();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch exercises"
      );
    }
  }
);

// =========================
// INITIAL STATE
// =========================

const initialState = {
  exercises: [],
  loading: false,
  error: null,
};

// =========================
// SLICE
// =========================

const exerciseSlice = createSlice({
  name: "exercise",

  initialState,

  reducers: {
    clearExerciseError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // PENDING
      // =========================

      .addCase(getExercises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // =========================
      // SUCCESS
      // =========================

      .addCase(getExercises.fulfilled, (state, action) => {
        state.loading = false;

        state.exercises = action.payload.exercises;

        state.error = null;
      })

      // =========================
      // ERROR
      // =========================

      .addCase(getExercises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// =========================
// ACTIONS
// =========================

export const {
  clearExerciseError,
} = exerciseSlice.actions;

// =========================
// REDUCER
// =========================

export default exerciseSlice.reducer;