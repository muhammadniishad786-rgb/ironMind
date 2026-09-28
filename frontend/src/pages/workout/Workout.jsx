import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  X,
  Dumbbell,
  Trash2,
  Loader2,
} from "lucide-react";

import {
  getWorkouts,
  createWorkout,
  clearCreateSuccess,
} from "../../store/slices/workoutSlice";

import { getExercises } from "../../store/slices/exerciseSlice";

const Workouts = () => {
  const dispatch = useDispatch();

  // =========================
  // REDUX STATE
  // =========================

  const {
    workouts,
    loading,
    error,
    createLoading,
    createError,
    createSuccess,
  } = useSelector((state) => state.workout);

  const {
    exercises,
    loading: exercisesLoading,
    error: exercisesError,
  } = useSelector((state) => state.exercise);

  // =========================
  // LOCAL STATE
  // =========================

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [workoutExercises, setWorkoutExercises] = useState([
    {
      exercise: "",
      sets: 3,
      reps: 10,
      weight: 0,
      restTime: 60,
    },
  ]);

  // =========================
  // FETCH DATA
  // =========================

  useEffect(() => {
    dispatch(getWorkouts());
    dispatch(getExercises());
  }, [dispatch]);

  // =========================
  // CLOSE FORM AFTER SUCCESS
  // =========================

  useEffect(() => {
    if (createSuccess) {
      setShowForm(false);

      setName("");
      setDescription("");

      setWorkoutExercises([
        {
          exercise: "",
          sets: 3,
          reps: 10,
          weight: 0,
          restTime: 60,
        },
      ]);

      dispatch(clearCreateSuccess());
    }
  }, [createSuccess, dispatch]);

  // =========================
  // ADD EXERCISE
  // =========================

  const handleAddExercise = () => {
    setWorkoutExercises((prev) => [
      ...prev,
      {
        exercise: "",
        sets: 3,
        reps: 10,
        weight: 0,
        restTime: 60,
      },
    ]);
  };

  // =========================
  // REMOVE EXERCISE
  // =========================

  const handleRemoveExercise = (index) => {
    setWorkoutExercises((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // =========================
  // UPDATE EXERCISE
  // =========================

  const handleExerciseChange = (
    index,
    field,
    value
  ) => {
    setWorkoutExercises((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]:
                field === "exercise"
                  ? value
                  : Number(value),
            }
          : item
      )
    );
  };

  // =========================
  // CREATE WORKOUT
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    const workoutData = {
      name,
      description,

      exercises: workoutExercises.map((item) => ({
        exercise: item.exercise,
        sets: item.sets,
        reps: item.reps,
        weight: item.weight,
        restTime: item.restTime,
      })),
    };

    dispatch(createWorkout(workoutData));
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="space-y-8">

      {/* =========================
          HEADER
      ========================== */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold text-white">
            Workouts
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Manage and track your workouts.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-orange-400"
        >
          <Plus size={18} />
          New Workout
        </button>

      </div>

      {/* =========================
          CREATE WORKOUT FORM
      ========================== */}

      {showForm && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">

          {/* FORM HEADER */}

          <div className="mb-6 flex items-center justify-between">

            <div>
              <h2 className="text-lg font-semibold text-white">
                Create Workout
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Build your workout routine.
              </p>
            </div>

            <button
              onClick={() => setShowForm(false)}
              className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
            >
              <X size={20} />
            </button>

          </div>

          {/* ERRORS */}

          {createError && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {createError}
            </div>
          )}

          {exercisesError && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {exercisesError}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* WORKOUT NAME */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Workout Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="e.g. Push Day"
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500"
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="e.g. Chest, shoulders and triceps"
                rows={3}
                className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500"
              />
            </div>

            {/* EXERCISES */}

            <div>

              <div className="mb-3 flex items-center justify-between">

                <label className="text-sm font-medium text-zinc-300">
                  Exercises
                </label>

                <button
                  type="button"
                  onClick={handleAddExercise}
                  className="flex items-center gap-1 text-sm font-medium text-orange-500 hover:text-orange-400"
                >
                  <Plus size={16} />
                  Add Exercise
                </button>

              </div>

              <div className="space-y-4">

                {workoutExercises.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
                    >

                      {/* EXERCISE HEADER */}

                      <div className="mb-4 flex items-center justify-between">

                        <div className="flex items-center gap-2">

                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                            <Dumbbell size={16} />
                          </div>

                          <span className="text-sm font-medium text-white">
                            Exercise {index + 1}
                          </span>

                        </div>

                        {workoutExercises.length >
                          1 && (
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveExercise(
                                index
                              )
                            }
                            className="rounded-lg p-2 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
                          >
                            <Trash2 size={17} />
                          </button>
                        )}

                      </div>

                      {/* EXERCISE SELECT */}

                      <div className="mb-4">

                        <label className="mb-2 block text-xs font-medium text-zinc-500">
                          Exercise
                        </label>

                        <select
                          value={item.exercise}
                          onChange={(e) =>
                            handleExerciseChange(
                              index,
                              "exercise",
                              e.target.value
                            )
                          }
                          required
                          disabled={exercisesLoading}
                          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
                        >

                          <option value="">
                            {exercisesLoading
                              ? "Loading exercises..."
                              : "Select an exercise"}
                          </option>

                          {exercises.map(
                            (exercise) => (
                              <option
                                key={exercise._id}
                                value={exercise._id}
                              >
                                {exercise.name} —{" "}
                                {exercise.muscleGroup}
                              </option>
                            )
                          )}

                        </select>

                      </div>

                      {/* SETS / REPS / WEIGHT / REST */}

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                        {/* SETS */}

                        <div>
                          <label className="mb-2 block text-xs text-zinc-500">
                            Sets
                          </label>

                          <input
                            type="number"
                            min="1"
                            value={item.sets}
                            onChange={(e) =>
                              handleExerciseChange(
                                index,
                                "sets",
                                e.target.value
                              )
                            }
                            required
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-sm text-white outline-none focus:border-orange-500"
                          />
                        </div>

                        {/* REPS */}

                        <div>
                          <label className="mb-2 block text-xs text-zinc-500">
                            Reps
                          </label>

                          <input
                            type="number"
                            min="1"
                            value={item.reps}
                            onChange={(e) =>
                              handleExerciseChange(
                                index,
                                "reps",
                                e.target.value
                              )
                            }
                            required
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-sm text-white outline-none focus:border-orange-500"
                          />
                        </div>

                        {/* WEIGHT */}

                        <div>
                          <label className="mb-2 block text-xs text-zinc-500">
                            Weight (kg)
                          </label>

                          <input
                            type="number"
                            min="0"
                            value={item.weight}
                            onChange={(e) =>
                              handleExerciseChange(
                                index,
                                "weight",
                                e.target.value
                              )
                            }
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-sm text-white outline-none focus:border-orange-500"
                          />
                        </div>

                        {/* REST */}

                        <div>
                          <label className="mb-2 block text-xs text-zinc-500">
                            Rest (sec)
                          </label>

                          <input
                            type="number"
                            min="0"
                            value={item.restTime}
                            onChange={(e) =>
                              handleExerciseChange(
                                index,
                                "restTime",
                                e.target.value
                              )
                            }
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-sm text-white outline-none focus:border-orange-500"
                          />
                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

            {/* FORM BUTTONS */}

            <div className="flex flex-col-reverse gap-3 border-t border-zinc-800 pt-5 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={createLoading}
                className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {createLoading && (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                )}

                {createLoading
                  ? "Creating..."
                  : "Create Workout"}

              </button>

            </div>

          </form>

        </div>
      )}

      {/* =========================
          LOADING WORKOUTS
      ========================== */}

      {loading && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <p className="text-sm text-zinc-500">
            Loading workouts...
          </p>
        </div>
      )}

      {/* =========================
          WORKOUT ERROR
      ========================== */}

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* =========================
          WORKOUT LIST
      ========================== */}

      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {workouts.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-zinc-500">
                <Dumbbell size={22} />
              </div>

              <h2 className="text-lg font-semibold text-white">
                No workouts yet
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Create your first workout to get started.
              </p>

            </div>
          ) : (
            workouts.map((workout) => (
              <div
                key={workout._id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700"
              >

                <h2 className="text-lg font-semibold text-white">
                  {workout.name}
                </h2>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  {workout.description ||
                    "No description"}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">

                  <span className="text-sm text-zinc-500">
                    Exercises
                  </span>

                  <span className="rounded-lg bg-orange-500/10 px-2.5 py-1 text-sm font-semibold text-orange-500">
                    {workout.exercises?.length || 0}
                  </span>

                </div>

              </div>
            ))
          )}

        </div>
      )}

    </div>
  );
};

export default Workouts;