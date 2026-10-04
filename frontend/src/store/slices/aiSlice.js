import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  generateAIWorkout,
  askAI,
} from "../../services/aiApi";

// Generate workout
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

// Ask AI
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

const initialState = {
  workout: null,
  response: "",
  loading: false,
  error: null,
};

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
  },

  extraReducers: (builder) => {
    builder

      // Generate Workout
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

      // AI Chat
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
} = aiSlice.actions;

export default aiSlice.reducer;