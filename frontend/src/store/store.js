import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import workoutReducer from "./slices/workoutSlice"
import exerciseReducer from "./slices/exerciseSlice"
import aiReducer from "./slices/aiSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    workout: workoutReducer,
    exercise: exerciseReducer,
    ai: aiReducer
  },
});

export default store;