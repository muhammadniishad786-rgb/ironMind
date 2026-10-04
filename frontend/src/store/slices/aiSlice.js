import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  generateAIWorkout,
  askAI,
  saveAIWorkout,
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
// INITIAL STATE
// =====================================================

const initialState = {
  workout: null,
  savedWorkout: null,
  response: "",

  loading: false,
  saving: false,

  error: null,
  saveError: null,

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
      });
  },
});

export const {
  clearWorkout,
  clearAIResponse,
  clearSaveStatus,
} = aiSlice.actions;

export default aiSlice.reducer;