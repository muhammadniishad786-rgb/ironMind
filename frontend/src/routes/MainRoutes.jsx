import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import ProtectedRoute from "./ProtectedRoutes";
import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../pages/dashboard/Dashboard";
import Workouts from "../pages/workout/Workout";
import Progress from "../pages/progress/Progress";
import Exercises from "../pages/exercises/Exercises";
import ExerciseDetails from "../pages/exercises/ExercisesDetails";
import WorkoutDetails from "../pages/workout/WorkoutDetails";
import Profile from "../pages/profile/Profile";
import AIWorkoutGenerator from "../pages/AI/AiWorkoutGenerator";

const MainRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            PUBLIC ROUTES
        ========================== */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* =========================
            PROTECTED ROUTES
        ========================== */}

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/workouts" element={<Workouts />} />

            <Route path="/workouts/:id" element={<WorkoutDetails />} />

            <Route path="/exercises" element={<Exercises />} />

            <Route path="/exercises/:id" element={<ExerciseDetails />} />

            <Route path="/progress" element={<Progress />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/ai-workout" element={<AIWorkoutGenerator />} />


          </Route>
        </Route>

        {/* =========================
            DEFAULT ROUTE
        ========================== */}

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoute;
