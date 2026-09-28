import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  Plus,
  X,
  Dumbbell,
  Trash2,
  Pencil,
  Loader2,
  ArrowRight,
} from "lucide-react";

import {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  clearCreateSuccess,
  clearUpdateSuccess,
} from "../../store/slices/workoutSlice";

import { getExercises } from "../../store/slices/exerciseSlice";

const initialExercise = {
  exercise: "",
  sets: 3,
  reps: 10,
  weight: 0,
  restTime: 60,
};

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

    updateLoading,
    updateError,
    updateSuccess,

    deleteLoading,
    deleteError,
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

  const [editingWorkout, setEditingWorkout] =
    useState(null);

  const [name, setName] = useState("");

  const [description, setDescription] =
    useState("");

  const [workoutExercises, setWorkoutExercises] =
    useState([initialExercise]);

  // =========================
  // FETCH DATA
  // =========================

  useEffect(() => {
    dispatch(getWorkouts());
    dispatch(getExercises());
  }, [dispatch]);

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setShowForm(false);
    setEditingWorkout(null);

    setName("");
    setDescription("");

    setWorkoutExercises([
      {
        ...initialExercise,
      },
    ]);
  };

  // =========================
  // CREATE SUCCESS
  // =========================

  useEffect(() => {
    if (createSuccess) {
      resetForm();

      dispatch(clearCreateSuccess());
    }
  }, [createSuccess, dispatch]);

  // =========================
  // UPDATE SUCCESS
  // =========================

  useEffect(() => {
    if (updateSuccess) {
      resetForm();

      dispatch(clearUpdateSuccess());
    }
  }, [updateSuccess, dispatch]);

  // =========================
  // OPEN CREATE FORM
  // =========================

  const openCreateForm = () => {
    setEditingWorkout(null);

    setName("");
    setDescription("");

    setWorkoutExercises([
      {
        ...initialExercise,
      },
    ]);

    setShowForm(true);
  };

  // =========================
  // OPEN EDIT FORM
  // =========================

  const openEditForm = (workout) => {
    setEditingWorkout(workout);

    setName(workout.name || "");

    setDescription(
      workout.description || ""
    );

    setWorkoutExercises(
      workout.exercises?.length
        ? workout.exercises.map((item) => ({
            exercise:
              item.exercise?._id ||
              item.exercise ||
              "",
            sets: item.sets ?? 3,
            reps: item.reps ?? 10,
            weight: item.weight ?? 0,
            restTime: item.restTime ?? 60,
          }))
        : [
            {
              ...initialExercise,
            },
          ]
    );

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // CLOSE FORM
  // =========================

  const closeForm = () => {
    resetForm();
  };

  // =========================
  // ADD EXERCISE
  // =========================

  const handleAddExercise = () => {
    setWorkoutExercises((prev) => [
      ...prev,
      {
        ...initialExercise,
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
  // SUBMIT
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    const workoutData = {
      name,
      description,

      exercises: workoutExercises.map(
        (item) => ({
          exercise: item.exercise,
          sets: item.sets,
          reps: item.reps,
          weight: item.weight,
          restTime: item.restTime,
        })
      ),
    };

    if (editingWorkout) {
      dispatch(
        updateWorkout({
          workoutId: editingWorkout._id,
          workoutData,
        })
      );
    } else {
      dispatch(createWorkout(workoutData));
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = (workoutId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this workout?"
    );

    if (!confirmed) return;

    dispatch(deleteWorkout(workoutId));
  };

  return (
    <div className="space-y-8">

      {/* =========================
          HEADER
      ========================= */}

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
          onClick={openCreateForm}
          className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-orange-400"
        >
          <Plus size={18} />
          New Workout
        </button>
      </div>

      {/* =========================
          FORM
      ========================= */}

      {showForm && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">

          {/* FORM HEADER */}

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                {editingWorkout
                  ? "Edit Workout"
                  : "Create Workout"}
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                {editingWorkout
                  ? "Update your workout routine."
                  : "Build your workout routine."}
              </p>
            </div>

            <button
              onClick={closeForm}
              className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* ERRORS */}

          {(createError ||
            updateError ||
            deleteError ||
            exercisesError) && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {createError ||
                updateError ||
                deleteError ||
                exercisesError}
            </div>
          )}

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* NAME */}

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
                  setDescription(
                    e.target.value
                  )
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
                          disabled={
                            exercisesLoading
                          }
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
                                value={
                                  exercise._id
                                }
                              >
                                {exercise.name} —{" "}
                                {
                                  exercise.muscleGroup
                                }
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
                onClick={closeForm}
                className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  createLoading ||
                  updateLoading
                }
                className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {(createLoading ||
                  updateLoading) && (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                )}

                {createLoading
                  ? "Creating..."
                  : updateLoading
                  ? "Updating..."
                  : editingWorkout
                  ? "Update Workout"
                  : "Create Workout"}

              </button>

            </div>

          </form>
        </div>
      )}

      {/* =========================
          LOADING
      ========================= */}

      {loading && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <Loader2
            size={24}
            className="mx-auto animate-spin text-orange-500"
          />

          <p className="mt-3 text-sm text-zinc-500">
            Loading workouts...
          </p>
        </div>
      )}

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* =========================
          WORKOUT LIST
      ========================= */}

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
                Create your first workout to
                get started.
              </p>

            </div>
          ) : (
            workouts.map((workout) => (
              <div
                key={workout._id}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-orange-500/40 hover:bg-zinc-[950]"
              >

                {/* =========================
                    CLICKABLE WORKOUT CONTENT
                ========================= */}

                <Link
                  to={`/workouts/${workout._id}`}
                  className="block"
                >

                  <div className="flex items-start gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                      <Dumbbell size={21} />
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-semibold text-white transition group-hover:text-orange-400">
                        {workout.name}
                      </h2>

                      <p className="mt-1 line-clamp-2 text-sm text-zinc-500">
                        {workout.description ||
                          "No description"}
                      </p>
                    </div>

                  </div>

                  {/* EXERCISE COUNT */}

                  <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">

                    <span className="text-sm text-zinc-500">
                      Exercises
                    </span>

                    <span className="rounded-lg bg-orange-500/10 px-2.5 py-1 text-sm font-semibold text-orange-500">
                      {workout.exercises
                        ?.length || 0}
                    </span>

                  </div>

                  {/* VIEW DETAILS */}

                  <div className="mt-4 flex items-center justify-between">

                    <span className="text-xs font-medium text-zinc-500 transition group-hover:text-orange-500">
                      View workout details
                    </span>

                    <ArrowRight
                      size={16}
                      className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-orange-500"
                    />

                  </div>

                </Link>

                {/* =========================
                    EDIT / DELETE
                ========================= */}

                <div className="mt-4 flex items-center justify-end gap-1 border-t border-zinc-800 pt-3">

                  {/* EDIT */}

                  <button
                    onClick={() =>
                      openEditForm(workout)
                    }
                    className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
                    title="Edit workout"
                  >
                    <Pencil size={16} />
                  </button>

                  {/* DELETE */}

                  <button
                    onClick={() =>
                      handleDelete(
                        workout._id
                      )
                    }
                    disabled={deleteLoading}
                    className="rounded-lg p-2 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                    title="Delete workout"
                  >
                    {deleteLoading ? (
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>

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
