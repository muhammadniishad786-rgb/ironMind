import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getWorkouts as getWorkoutsApi,
  getWorkoutById as getWorkoutByIdApi,
  createWorkout as createWorkoutApi,
  updateWorkout as updateWorkoutApi,
  deleteWorkout as deleteWorkoutApi,
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
// GET SINGLE WORKOUT
// =========================

export const getWorkoutById = createAsyncThunk(
  "workout/getWorkoutById",

  async (workoutId, { rejectWithValue }) => {
    try {
      const response =
        await getWorkoutByIdApi(workoutId);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch workout"
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
      const response =
        await createWorkoutApi(workoutData);

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
// UPDATE WORKOUT
// =========================

export const updateWorkout = createAsyncThunk(
  "workout/updateWorkout",

  async (
    { workoutId, workoutData },
    { rejectWithValue }
  ) => {
    try {
      const response =
        await updateWorkoutApi(
          workoutId,
          workoutData
        );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update workout"
      );
    }
  }
);

// =========================
// DELETE WORKOUT
// =========================

export const deleteWorkout = createAsyncThunk(
  "workout/deleteWorkout",

  async (workoutId, { rejectWithValue }) => {
    try {
      const response =
        await deleteWorkoutApi(workoutId);

      return {
        ...response.data,
        workoutId,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete workout"
      );
    }
  }
);

// =========================
// INITIAL STATE
// =========================

const initialState = {
  workouts: [],

  // Single workout
  selectedWorkout: null,

  // Get all
  loading: false,
  error: null,

  // Get single
  detailsLoading: false,
  detailsError: null,

  // Create
  createLoading: false,
  createError: null,
  createSuccess: false,

  // Update
  updateLoading: false,
  updateError: null,
  updateSuccess: false,

  // Delete
  deleteLoading: false,
  deleteError: null,
};

// =========================
// SLICE
// =========================

const workoutSlice = createSlice({
  name: "workout",

  initialState,

  reducers: {
    // =========================
    // CLEAR ERRORS
    // =========================

    clearWorkoutError: (state) => {
      state.error = null;
      state.createError = null;
      state.detailsError = null;
      state.updateError = null;
      state.deleteError = null;
    },

    // =========================
    // CREATE SUCCESS
    // =========================

    clearCreateSuccess: (state) => {
      state.createSuccess = false;
    },

    // =========================
    // UPDATE SUCCESS
    // =========================

    clearUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },

    // =========================
    // CLEAR SELECTED WORKOUT
    // =========================

    clearSelectedWorkout: (state) => {
      state.selectedWorkout = null;
      state.detailsError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // GET WORKOUTS
      // =========================

      .addCase(
        getWorkouts.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getWorkouts.fulfilled,
        (state, action) => {
          state.loading = false;

          state.workouts =
            action.payload.workouts;

          state.error = null;
        }
      )

      .addCase(
        getWorkouts.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // =========================
      // GET SINGLE WORKOUT
      // =========================

      .addCase(
        getWorkoutById.pending,
        (state) => {
          state.detailsLoading = true;
          state.detailsError = null;
          state.selectedWorkout = null;
        }
      )

      .addCase(
        getWorkoutById.fulfilled,
        (state, action) => {
          state.detailsLoading = false;
          state.detailsError = null;

          state.selectedWorkout =
            action.payload.workout;
        }
      )

      .addCase(
        getWorkoutById.rejected,
        (state, action) => {
          state.detailsLoading = false;
          state.detailsError = action.payload;
        }
      )

      // =========================
      // CREATE WORKOUT
      // =========================

      .addCase(
        createWorkout.pending,
        (state) => {
          state.createLoading = true;
          state.createError = null;
          state.createSuccess = false;
        }
      )

      .addCase(
        createWorkout.fulfilled,
        (state, action) => {
          state.createLoading = false;
          state.createSuccess = true;
          state.createError = null;

          // Add newly created workout
          // to existing workout list

          state.workouts.unshift(
            action.payload.workout
          );
        }
      )

      .addCase(
        createWorkout.rejected,
        (state, action) => {
          state.createLoading = false;
          state.createSuccess = false;
          state.createError = action.payload;
        }
      )

      // =========================
      // UPDATE WORKOUT
      // =========================

      .addCase(
        updateWorkout.pending,
        (state) => {
          state.updateLoading = true;
          state.updateError = null;
          state.updateSuccess = false;
        }
      )

      .addCase(
        updateWorkout.fulfilled,
        (state, action) => {
          state.updateLoading = false;
          state.updateSuccess = true;
          state.updateError = null;

          const updatedWorkout =
            action.payload.workout;

          // Update workout in list

          const index =
            state.workouts.findIndex(
              (workout) =>
                workout._id ===
                updatedWorkout._id
            );

          if (index !== -1) {
            state.workouts[index] =
              updatedWorkout;
          }

          // Update selected workout
          // if currently open

          state.selectedWorkout =
            updatedWorkout;
        }
      )

      .addCase(
        updateWorkout.rejected,
        (state, action) => {
          state.updateLoading = false;
          state.updateSuccess = false;
          state.updateError = action.payload;
        }
      )

      // =========================
      // DELETE WORKOUT
      // =========================

      .addCase(
        deleteWorkout.pending,
        (state) => {
          state.deleteLoading = true;
          state.deleteError = null;
        }
      )

      .addCase(
        deleteWorkout.fulfilled,
        (state, action) => {
          state.deleteLoading = false;
          state.deleteError = null;

          state.workouts =
            state.workouts.filter(
              (workout) =>
                workout._id !==
                action.payload.workoutId
            );

          // Clear selected workout
          // if it was deleted

          if (
            state.selectedWorkout?._id ===
            action.payload.workoutId
          ) {
            state.selectedWorkout = null;
          }
        }
      )

      .addCase(
        deleteWorkout.rejected,
        (state, action) => {
          state.deleteLoading = false;
          state.deleteError = action.payload;
        }
      );
  },
});

// =========================
// ACTIONS
// =========================

export const {
  clearWorkoutError,
  clearCreateSuccess,
  clearUpdateSuccess,
  clearSelectedWorkout,
} = workoutSlice.actions;

// =========================
// REDUCER
// =========================

export default workoutSlice.reducer;
