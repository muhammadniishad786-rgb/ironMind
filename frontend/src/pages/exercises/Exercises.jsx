import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Plus,
  X,
  Dumbbell,
  Pencil,
  Trash2,
  Loader2,
  ArrowRight,
} from "lucide-react";

import {
  getExercises,
  createExercise,
  updateExercise,
  deleteExercise,
  clearCreateSuccess,
  clearUpdateSuccess,
} from "../../store/slices/exerciseSlice";

const initialForm = {
  name: "",
  muscleGroup: "chest",
  equipment: "bodyweight",
  difficulty: "beginner",
  instructions: "",
  image: "",
  videoUrl: "",
  videoThumbnail: "",
};

const Exercises = () => {
  const dispatch = useDispatch();

  const {
    exercises,
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
  } = useSelector((state) => state.exercise);

  const [showForm, setShowForm] = useState(false);
  const [editingExercise, setEditingExercise] =
    useState(null);

  const [formData, setFormData] =
    useState(initialForm);

  useEffect(() => {
    dispatch(getExercises());
  }, [dispatch]);

  // =========================
  // CLOSE FORM AFTER CREATE
  // =========================

  useEffect(() => {
    if (createSuccess) {
      setShowForm(false);
      setEditingExercise(null);
      setFormData(initialForm);

      dispatch(clearCreateSuccess());
    }
  }, [createSuccess, dispatch]);

  // =========================
  // CLOSE FORM AFTER UPDATE
  // =========================

  useEffect(() => {
    if (updateSuccess) {
      setShowForm(false);
      setEditingExercise(null);
      setFormData(initialForm);

      dispatch(clearUpdateSuccess());
    }
  }, [updateSuccess, dispatch]);

  // =========================
  // FORM HANDLERS
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openCreateForm = () => {
    setEditingExercise(null);
    setFormData(initialForm);
    setShowForm(true);
  };

  const openEditForm = (exercise) => {
    setEditingExercise(exercise);

    setFormData({
      name: exercise.name || "",
      muscleGroup:
        exercise.muscleGroup || "chest",
      equipment:
        exercise.equipment || "bodyweight",
      difficulty:
        exercise.difficulty || "beginner",
      instructions:
        exercise.instructions || "",
      image: exercise.image || "",
      videoUrl: exercise.videoUrl || "",
      videoThumbnail:
        exercise.videoThumbnail || "",
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingExercise(null);
    setFormData(initialForm);
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingExercise) {
      dispatch(
        updateExercise({
          exerciseId: editingExercise._id,
          exerciseData: formData,
        })
      );
    } else {
      dispatch(createExercise(formData));
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = (exerciseId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this exercise?"
    );

    if (!confirmed) return;

    dispatch(deleteExercise(exerciseId));
  };

  return (
    <div className="space-y-8">
      {/* =========================
          HEADER
      ========================= */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Exercises
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Manage your exercise library.
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-orange-400"
        >
          <Plus size={18} />
          Add Exercise
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
                {editingExercise
                  ? "Edit Exercise"
                  : "Create Exercise"}
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                {editingExercise
                  ? "Update exercise information."
                  : "Add a new exercise to your library."}
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
            deleteError) && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {createError ||
                updateError ||
                deleteError}
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
                Exercise Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Bench Press"
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500"
              />
            </div>

            {/* SELECT FIELDS */}

            <div className="grid gap-4 sm:grid-cols-3">
              {/* MUSCLE GROUP */}

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Muscle Group
                </label>

                <select
                  name="muscleGroup"
                  value={formData.muscleGroup}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
                >
                  <option value="chest">
                    Chest
                  </option>

                  <option value="back">
                    Back
                  </option>

                  <option value="shoulders">
                    Shoulders
                  </option>

                  <option value="biceps">
                    Biceps
                  </option>

                  <option value="triceps">
                    Triceps
                  </option>

                  <option value="legs">
                    Legs
                  </option>

                  <option value="abs">
                    Abs
                  </option>

                  <option value="full_body">
                    Full Body
                  </option>
                </select>
              </div>

              {/* EQUIPMENT */}

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Equipment
                </label>

                <select
                  name="equipment"
                  value={formData.equipment}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
                >
                  <option value="bodyweight">
                    Bodyweight
                  </option>

                  <option value="dumbbell">
                    Dumbbell
                  </option>

                  <option value="barbell">
                    Barbell
                  </option>

                  <option value="machine">
                    Machine
                  </option>

                  <option value="cable">
                    Cable
                  </option>

                  <option value="resistance_band">
                    Resistance Band
                  </option>
                </select>
              </div>

              {/* DIFFICULTY */}

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Difficulty
                </label>

                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
                >
                  <option value="beginner">
                    Beginner
                  </option>

                  <option value="intermediate">
                    Intermediate
                  </option>

                  <option value="advanced">
                    Advanced
                  </option>
                </select>
              </div>
            </div>

            {/* INSTRUCTIONS */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Instructions
              </label>

              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Explain how to perform the exercise..."
                rows={4}
                required
                className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-orange-500"
              />
            </div>

            {/* MEDIA */}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Image URL
                </label>

                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Video URL
                </label>

                <input
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-orange-500"
                />
              </div>
            </div>

            {/* VIDEO THUMBNAIL */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Video Thumbnail URL
              </label>

              <input
                type="url"
                name="videoThumbnail"
                value={formData.videoThumbnail}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-orange-500"
              />
            </div>

            {/* BUTTONS */}

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
                  : editingExercise
                  ? "Update Exercise"
                  : "Create Exercise"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================
          PAGE ERROR
      ========================= */}

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
          <p className="text-sm text-red-400">
            {error}
          </p>
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
            Loading exercises...
          </p>
        </div>
      )}

      {/* =========================
          EXERCISE GRID
      ========================= */}

      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exercises.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-zinc-500">
                <Dumbbell size={22} />
              </div>

              <h2 className="text-lg font-semibold text-white">
                No exercises yet
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Add your first exercise to get
                started.
              </p>
            </div>
          ) : (
            exercises.map((exercise) => (
              <div
                key={exercise._id}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-orange-500/40 hover:bg-zinc-[950]"
              >
                {/* =========================
                    CLICKABLE CONTENT
                ========================= */}

                <Link
                  to={`/exercises/${exercise._id}`}
                  className="block"
                >
                  {/* TOP */}

                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                      <Dumbbell size={21} />
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-semibold text-white transition group-hover:text-orange-400">
                        {exercise.name}
                      </h2>

                      <p className="mt-0.5 text-xs capitalize text-zinc-500">
                        {exercise.muscleGroup.replace(
                          "_",
                          " "
                        )}
                      </p>
                    </div>
                  </div>

                  {/* TAGS */}

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-lg bg-zinc-800 px-2.5 py-1 text-xs capitalize text-zinc-400">
                      {exercise.equipment.replace(
                        "_",
                        " "
                      )}
                    </span>

                    <span className="rounded-lg bg-orange-500/10 px-2.5 py-1 text-xs capitalize text-orange-500">
                      {exercise.difficulty}
                    </span>
                  </div>

                  {/* INSTRUCTIONS */}

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-500">
                    {exercise.instructions}
                  </p>

                  {/* MEDIA */}

                  {(exercise.videoUrl ||
                    exercise.image) && (
                    <div className="mt-4 border-t border-zinc-800 pt-4">
                      <span className="text-xs text-zinc-600">
                        Media available
                      </span>
                    </div>
                  )}

                  {/* VIEW DETAILS */}

                  <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">
                    <span className="text-xs font-medium text-zinc-500 transition group-hover:text-orange-500">
                      View exercise details
                    </span>

                    <ArrowRight
                      size={16}
                      className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-orange-500"
                    />
                  </div>
                </Link>

                {/* =========================
                    ACTION BUTTONS
                ========================= */}

                <div className="mt-3 flex items-center justify-end gap-1 border-t border-zinc-800 pt-3">
                  {/* EDIT */}

                  <button
                    onClick={() =>
                      openEditForm(exercise)
                    }
                    className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
                    title="Edit exercise"
                  >
                    <Pencil size={16} />
                  </button>

                  {/* DELETE */}

                  <button
                    onClick={() =>
                      handleDelete(exercise._id)
                    }
                    disabled={deleteLoading}
                    className="rounded-lg p-2 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                    title="Delete exercise"
                  >
                    <Trash2 size={16} />
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

export default Exercises;
