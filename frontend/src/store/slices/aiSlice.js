import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  generateAIWorkout,
  askAI,
  saveAIWorkout,
  getAIProgression,
} from "../../services/aiApi";

// =====================================================
// GENERATE AI WORKOUT
// =====================================================

export const generateWorkout = createAsyncThunk(
  "ai/generateWorkout",
  async (workoutData, { rejectWithValue }) => {
    try {
      const data = await generateAIWorkout(workoutData);

      return data.workout;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to generate workout"
      );
    }
  }
);

// =====================================================
// SAVE AI WORKOUT
// =====================================================

export const saveWorkout = createAsyncThunk(
  "ai/saveWorkout",
  async (workoutData, { rejectWithValue }) => {
    try {
      const data = await saveAIWorkout(workoutData);

      return data.workout;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to save workout"
      );
    }
  }
);

// =====================================================
// AI CHAT
// =====================================================

export const sendAIMessage = createAsyncThunk(
  "ai/sendAIMessage",
  async (message, { rejectWithValue }) => {
    try {
      const data = await askAI(message);

      return data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to get AI response"
      );
    }
  }
);

// =====================================================
// AI PROGRESSION
// =====================================================

export const getProgression = createAsyncThunk(
  "ai/getProgression",
  async (exerciseId, { rejectWithValue }) => {
    try {
      const data = await getAIProgression(exerciseId);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to generate AI progression"
      );
    }
  }
);

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  workout: null,
  savedWorkout: null,
  response: "",

  // AI progression
  progression: null,

  loading: false,
  saving: false,
  progressionLoading: false,

  error: null,
  saveError: null,
  progressionError: null,

  saveSuccess: false,
};

// =====================================================
// SLICE
// =====================================================

const aiSlice = createSlice({
  name: "ai",

  initialState,

  reducers: {
    clearWorkout: (state) => {
      state.workout = null;
      state.error = null;
    },

    clearAIResponse: (state) => {
      state.response = "";
      state.error = null;
    },

    clearSaveStatus: (state) => {
      state.saveSuccess = false;
      state.saveError = null;
      state.savedWorkout = null;
    },

    clearProgression: (state) => {
      state.progression = null;
      state.progressionError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =================================================
      // GENERATE WORKOUT
      // =================================================

      .addCase(generateWorkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(generateWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.workout = action.payload;
      })

      .addCase(generateWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =================================================
      // SAVE WORKOUT
      // =================================================

      .addCase(saveWorkout.pending, (state) => {
        state.saving = true;
        state.saveError = null;
        state.saveSuccess = false;
      })

      .addCase(saveWorkout.fulfilled, (state, action) => {
        state.saving = false;
        state.savedWorkout = action.payload;
        state.saveSuccess = true;
      })

      .addCase(saveWorkout.rejected, (state, action) => {
        state.saving = false;
        state.saveError = action.payload;
        state.saveSuccess = false;
      })

      // =================================================
      // AI CHAT
      // =================================================

      .addCase(sendAIMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(sendAIMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })

      .addCase(sendAIMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =================================================
      // AI PROGRESSION
      // =================================================

      .addCase(getProgression.pending, (state) => {
        state.progressionLoading = true;
        state.progressionError = null;
      })

      .addCase(getProgression.fulfilled, (state, action) => {
        state.progressionLoading = false;
        state.progression = action.payload;
      })

      .addCase(getProgression.rejected, (state, action) => {
        state.progressionLoading = false;
        state.progressionError = action.payload;
      });
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const {
  clearWorkout,
  clearAIResponse,
  clearSaveStatus,
  clearProgression,
} = aiSlice.actions;

// =====================================================
// REDUCER
// =====================================================

export default aiSlice.reducer;