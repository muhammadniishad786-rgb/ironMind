import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getExercises as getExercisesApi,
  createExercise as createExerciseApi,
  updateExercise as updateExerciseApi,
  deleteExercise as deleteExerciseApi,
} from "../../services/exerciseApi";

// =========================
// GET ALL EXERCISES
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
// CREATE EXERCISE
// =========================

export const createExercise = createAsyncThunk(
  "exercise/createExercise",

  async (exerciseData, { rejectWithValue }) => {
    try {
      const response = await createExerciseApi(
        exerciseData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create exercise"
      );
    }
  }
);

// =========================
// UPDATE EXERCISE
// =========================

export const updateExercise = createAsyncThunk(
  "exercise/updateExercise",

  async (
    { exerciseId, exerciseData },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateExerciseApi(
        exerciseId,
        exerciseData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update exercise"
      );
    }
  }
);

// =========================
// DELETE EXERCISE
// =========================

export const deleteExercise = createAsyncThunk(
  "exercise/deleteExercise",

  async (exerciseId, { rejectWithValue }) => {
    try {
      const response = await deleteExerciseApi(
        exerciseId
      );

      return {
        ...response.data,
        exerciseId,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete exercise"
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

  createLoading: false,
  createError: null,
  createSuccess: false,

  updateLoading: false,
  updateError: null,
  updateSuccess: false,

  deleteLoading: false,
  deleteError: null,
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
      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
    },

    clearCreateSuccess: (state) => {
      state.createSuccess = false;
    },

    clearUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // GET EXERCISES
      // =========================

      .addCase(getExercises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getExercises.fulfilled,
        (state, action) => {
          state.loading = false;

          state.exercises =
            action.payload.exercises;

          state.error = null;
        }
      )

      .addCase(
        getExercises.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // =========================
      // CREATE EXERCISE
      // =========================

      .addCase(
        createExercise.pending,
        (state) => {
          state.createLoading = true;
          state.createError = null;
          state.createSuccess = false;
        }
      )

      .addCase(
        createExercise.fulfilled,
        (state, action) => {
          state.createLoading = false;
          state.createSuccess = true;
          state.createError = null;

          state.exercises.unshift(
            action.payload.exercise
          );
        }
      )

      .addCase(
        createExercise.rejected,
        (state, action) => {
          state.createLoading = false;
          state.createSuccess = false;
          state.createError = action.payload;
        }
      )

      // =========================
      // UPDATE EXERCISE
      // =========================

      .addCase(
        updateExercise.pending,
        (state) => {
          state.updateLoading = true;
          state.updateError = null;
          state.updateSuccess = false;
        }
      )

      .addCase(
        updateExercise.fulfilled,
        (state, action) => {
          state.updateLoading = false;
          state.updateSuccess = true;
          state.updateError = null;

          const updatedExercise =
            action.payload.exercise;

          const index =
            state.exercises.findIndex(
              (exercise) =>
                exercise._id ===
                updatedExercise._id
            );

          if (index !== -1) {
            state.exercises[index] =
              updatedExercise;
          }
        }
      )

      .addCase(
        updateExercise.rejected,
        (state, action) => {
          state.updateLoading = false;
          state.updateSuccess = false;
          state.updateError = action.payload;
        }
      )

      // =========================
      // DELETE EXERCISE
      // =========================

      .addCase(
        deleteExercise.pending,
        (state) => {
          state.deleteLoading = true;
          state.deleteError = null;
        }
      )

      .addCase(
        deleteExercise.fulfilled,
        (state, action) => {
          state.deleteLoading = false;
          state.deleteError = null;

          state.exercises =
            state.exercises.filter(
              (exercise) =>
                exercise._id !==
                action.payload.exerciseId
            );
        }
      )

      .addCase(
        deleteExercise.rejected,
        (state, action) => {
          state.deleteLoading = false;
          state.deleteError = action.payload;
        }
      );
  },
});

export const {
  clearExerciseError,
  clearCreateSuccess,
  clearUpdateSuccess,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;