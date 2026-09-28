import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Dumbbell,
  Clock,
  CheckCircle2,
  Circle,
  Play,
  ExternalLink,
  Loader2,
  Target,
  Weight,
  Timer,
  Repeat,
  Trophy,
  Trash2,
} from "lucide-react";

import {
  getWorkoutById,
  clearSelectedWorkout,
  completeWorkoutExercise,
  removeWorkoutExercise,
} from "../../store/slices/workoutSlice";

const WorkoutDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // =========================
  // LOCAL STATE
  // =========================

  const [removingExerciseId, setRemovingExerciseId] =
    useState(null);

  // =========================
  // REDUX STATE
  // =========================

  const {
    selectedWorkout,
    detailsLoading,
    detailsError,
    exerciseCompleteLoading,
    exerciseCompleteError,
    exerciseRemoveLoading,
    exerciseRemoveError,
  } = useSelector((state) => state.workout);

  // =========================
  // GET WORKOUT
  // =========================

  useEffect(() => {
    dispatch(getWorkoutById(id));

    return () => {
      dispatch(clearSelectedWorkout());
    };
  }, [dispatch, id]);

  // =========================
  // COMPLETE EXERCISE
  // =========================

  const handleCompleteExercise = (exerciseId) => {
    if (!exerciseId) {
      return;
    }

    dispatch(
      completeWorkoutExercise({
        workoutId: id,
        exerciseId,
      })
    );
  };

  // =========================
  // REMOVE EXERCISE
  // =========================

  const handleRemoveExercise = (exerciseId) => {
    if (!exerciseId) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to remove this exercise from this workout?"
    );

    if (!confirmed) {
      return;
    }

    setRemovingExerciseId(exerciseId);

    dispatch(
      removeWorkoutExercise({
        workoutId: id,
        exerciseId,
      })
    ).finally(() => {
      setRemovingExerciseId(null);
    });
  };

  // =========================
  // LOADING
  // =========================

  if (detailsLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2
            size={30}
            className="mx-auto animate-spin text-orange-500"
          />

          <p className="mt-3 text-sm text-zinc-500">
            Loading workout...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (detailsError) {
    return (
      <div className="space-y-6">
        <Link
          to="/workouts"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Workouts
        </Link>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
          <p className="text-sm text-red-400">
            {detailsError}
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // NO WORKOUT
  // =========================

  if (!selectedWorkout) {
    return null;
  }

  const workout = selectedWorkout;

  // =========================
  // HELPERS
  // =========================

  const formatDate = (date) => {
    if (!date) {
      return "Not available";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatText = (value) => {
    if (!value) {
      return "Not specified";
    }

    return value
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // =========================
  // CHECK EXERCISE COMPLETION
  // =========================

  const isExerciseCompleted = (workoutExercise) => {
    return Boolean(workoutExercise.completed);
  };

  // =========================
  // CALCULATE COMPLETED EXERCISES
  // =========================

  const totalExercises =
    workout.exercises?.length || 0;

  const completedExercises =
    workout.exercises?.filter(
      (exercise) => exercise.completed
    ).length || 0;

  return (
    <div className="space-y-8">
      {/* =========================
          BACK BUTTON
      ========================= */}

      <Link
        to="/workouts"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
      >
        <ArrowLeft size={17} />
        Back to Workouts
      </Link>

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <Dumbbell size={23} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">
                {workout.name}
              </h1>

              <p className="mt-1 text-sm text-zinc-500">
                Workout details and exercises
              </p>
            </div>
          </div>

          {workout.description && (
            <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-400">
              {workout.description}
            </p>
          )}
        </div>

        {/* Workout Completion */}

        <div>
          {workout.completed ? (
            <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-2 text-sm font-medium text-green-400">
              <CheckCircle2 size={16} />
              Workout Completed
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-400">
              <Circle size={16} />
              In Progress
            </div>
          )}
        </div>
      </div>

      {/* =========================
          COMPLETION PROGRESS
      ========================= */}

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-white">
              Workout Progress
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              {completedExercises} of {totalExercises}{" "}
              exercises completed
            </p>
          </div>

          <div className="text-sm font-semibold text-orange-500">
            {totalExercises > 0
              ? Math.round(
                  (completedExercises /
                    totalExercises) *
                    100
                )
              : 0}
            %
          </div>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-orange-500 transition-all duration-500"
            style={{
              width: `${
                totalExercises > 0
                  ? (completedExercises /
                      totalExercises) *
                    100
                  : 0
              }%`,
            }}
          />
        </div>
      </div>

      {/* =========================
          WORKOUT STATS
      ========================= */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Exercises */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <Dumbbell size={19} />
            </div>

            <div>
              <p className="text-xs text-zinc-600">
                Exercises
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                {totalExercises}
              </p>
            </div>
          </div>
        </div>

        {/* Duration */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <Clock size={19} />
            </div>

            <div>
              <p className="text-xs text-zinc-600">
                Duration
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                {workout.duration
                  ? `${workout.duration} min`
                  : "Not set"}
              </p>
            </div>
          </div>
        </div>

        {/* Status */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              {workout.completed ? (
                <CheckCircle2 size={19} />
              ) : (
                <Target size={19} />
              )}
            </div>

            <div>
              <p className="text-xs text-zinc-600">
                Status
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                {workout.completed
                  ? "Completed"
                  : "In Progress"}
              </p>
            </div>
          </div>
        </div>

        {/* Completed Date */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <Trophy size={19} />
            </div>

            <div>
              <p className="text-xs text-zinc-600">
                Completed On
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                {workout.completedAt
                  ? formatDate(workout.completedAt)
                  : "Not completed"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          COMPLETE ERROR
      ========================= */}

      {exerciseCompleteError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm text-red-400">
            {exerciseCompleteError}
          </p>
        </div>
      )}

      {/* =========================
          REMOVE ERROR
      ========================= */}

      {exerciseRemoveError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm text-red-400">
            {exerciseRemoveError}
          </p>
        </div>
      )}

      {/* =========================
          EXERCISES
      ========================= */}

      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-white">
            Workout Exercises
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Complete each exercise as you finish it
          </p>
        </div>

        {workout.exercises?.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <Dumbbell
              size={35}
              className="mx-auto text-zinc-700"
            />

            <p className="mt-3 text-sm text-zinc-500">
              No exercises added to this workout.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {workout.exercises?.map(
              (workoutExercise, index) => {
                const exercise =
                  workoutExercise.exercise;

                const isExerciseObject =
                  typeof exercise === "object" &&
                  exercise !== null;

                const exerciseName =
                  isExerciseObject
                    ? exercise?.name
                    : "Exercise";

                const exerciseImage =
                  isExerciseObject
                    ? exercise?.image
                    : "";

                const exerciseVideo =
                  isExerciseObject
                    ? exercise?.videoUrl
                    : "";

                const exerciseThumbnail =
                  isExerciseObject
                    ? exercise?.videoThumbnail
                    : "";

                const muscleGroup =
                  isExerciseObject
                    ? exercise?.muscleGroup
                    : "";

                const equipment =
                  isExerciseObject
                    ? exercise?.equipment
                    : "";

                const difficulty =
                  isExerciseObject
                    ? exercise?.difficulty
                    : "";

                const exerciseCompleted =
                  isExerciseCompleted(
                    workoutExercise
                  );

                const exerciseId =
                  isExerciseObject
                    ? exercise?._id
                    : exercise;

                const isRemoving =
                  removingExerciseId ===
                  exerciseId;

                return (
                  <div
                    key={
                      workoutExercise._id ||
                      `${exerciseName}-${index}`
                    }
                    className={`overflow-hidden rounded-2xl border bg-zinc-900 ${
                      exerciseCompleted
                        ? "border-green-500/20"
                        : "border-zinc-800"
                    }`}
                  >
                    {/* =========================
                        EXERCISE HEADER
                    ========================= */}

                    <div className="flex flex-col gap-4 border-b border-zinc-800 p-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                            exerciseCompleted
                              ? "bg-green-500/10 text-green-400"
                              : "bg-orange-500/10 text-orange-500"
                          }`}
                        >
                          {exerciseCompleted ? (
                            <CheckCircle2 size={20} />
                          ) : (
                            index + 1
                          )}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="font-semibold text-white">
                              {exerciseName}
                            </h3>

                            {exerciseCompleted && (
                              <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-[11px] font-medium text-green-400">
                                Completed
                              </span>
                            )}
                          </div>

                          <div className="mt-2 flex flex-wrap gap-2">
                            {muscleGroup && (
                              <span className="rounded-md bg-zinc-800 px-2 py-1 text-[11px] capitalize text-zinc-400">
                                {formatText(
                                  muscleGroup
                                )}
                              </span>
                            )}

                            {equipment && (
                              <span className="rounded-md bg-zinc-800 px-2 py-1 text-[11px] capitalize text-zinc-400">
                                {formatText(
                                  equipment
                                )}
                              </span>
                            )}

                            {difficulty && (
                              <span className="rounded-md bg-orange-500/10 px-2 py-1 text-[11px] capitalize text-orange-500">
                                {formatText(
                                  difficulty
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* =========================
                          ACTION BUTTONS
                      ========================= */}

                      <div className="flex flex-wrap items-center gap-3">
                        {/* VIEW EXERCISE */}

                        {isExerciseObject &&
                          exercise?._id && (
                            <Link
                              to={`/exercises/${exercise._id}`}
                              className="inline-flex items-center gap-2 text-sm font-medium text-orange-500 transition hover:text-orange-400"
                            >
                              View Exercise
                              <ExternalLink
                                size={15}
                              />
                            </Link>
                          )}

                        {/* COMPLETE BUTTON */}

                        {exerciseCompleted ? (
                          <button
                            type="button"
                            disabled
                            className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-green-500/10 px-4 py-2.5 text-sm font-medium text-green-400"
                          >
                            <CheckCircle2
                              size={17}
                            />
                            Completed
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={
                              exerciseCompleteLoading
                            }
                            onClick={() =>
                              handleCompleteExercise(
                                exerciseId
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {exerciseCompleteLoading ? (
                              <>
                                <Loader2
                                  size={17}
                                  className="animate-spin"
                                />
                                Completing...
                              </>
                            ) : (
                              <>
                                <CheckCircle2
                                  size={17}
                                />
                                Complete Exercise
                              </>
                            )}
                          </button>
                        )}

                        {/* REMOVE BUTTON */}

                        <button
                          type="button"
                          disabled={
                            exerciseRemoveLoading ||
                            isRemoving
                          }
                          onClick={() =>
                            handleRemoveExercise(
                              exerciseId
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/20 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isRemoving ? (
                            <>
                              <Loader2
                                size={17}
                                className="animate-spin"
                              />
                              Removing...
                            </>
                          ) : (
                            <>
                              <Trash2 size={17} />
                              Remove
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* =========================
                        EXERCISE CONTENT
                    ========================= */}

                    <div className="grid gap-6 p-5 lg:grid-cols-3">
                      {/* IMAGE */}

                      <div className="lg:col-span-1">
                        {exerciseImage ? (
                          <img
                            src={exerciseImage}
                            alt={exerciseName}
                            className="h-56 w-full rounded-xl object-cover"
                          />
                        ) : (
                          <div className="flex h-56 items-center justify-center rounded-xl bg-zinc-950">
                            <div className="text-center">
                              <Dumbbell
                                size={35}
                                className="mx-auto text-zinc-700"
                              />

                              <p className="mt-2 text-xs text-zinc-600">
                                No image available
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* WORKOUT DATA */}

                      <div className="lg:col-span-2">
                        <div className="grid gap-3 sm:grid-cols-2">
                          {/* Sets */}

                          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                            <div className="flex items-center gap-3">
                              <Repeat
                                size={18}
                                className="text-orange-500"
                              />

                              <div>
                                <p className="text-xs text-zinc-600">
                                  Sets
                                </p>

                                <p className="mt-1 text-lg font-semibold text-white">
                                  {workoutExercise.sets ||
                                    0}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Reps */}

                          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                            <div className="flex items-center gap-3">
                              <Target
                                size={18}
                                className="text-orange-500"
                              />

                              <div>
                                <p className="text-xs text-zinc-600">
                                  Reps
                                </p>

                                <p className="mt-1 text-lg font-semibold text-white">
                                  {workoutExercise.reps ||
                                    0}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Weight */}

                          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                            <div className="flex items-center gap-3">
                              <Weight
                                size={18}
                                className="text-orange-500"
                              />

                              <div>
                                <p className="text-xs text-zinc-600">
                                  Weight
                                </p>

                                <p className="mt-1 text-lg font-semibold text-white">
                                  {workoutExercise.weight ||
                                    0}{" "}
                                  kg
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Rest */}

                          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                            <div className="flex items-center gap-3">
                              <Timer
                                size={18}
                                className="text-orange-500"
                              />

                              <div>
                                <p className="text-xs text-zinc-600">
                                  Rest Time
                                </p>

                                <p className="mt-1 text-lg font-semibold text-white">
                                  {workoutExercise.restTime ||
                                    0}{" "}
                                  sec
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* VIDEO */}

                        {exerciseVideo && (
                          <div className="mt-5">
                            <div className="mb-3 flex items-center gap-2">
                              <Play
                                size={17}
                                className="text-orange-500"
                              />

                              <p className="text-sm font-medium text-white">
                                Exercise Video
                              </p>
                            </div>

                            <div className="overflow-hidden rounded-xl bg-black">
                              <video
                                controls
                                poster={
                                  exerciseThumbnail ||
                                  undefined
                                }
                                className="max-h-[350px] w-full"
                              >
                                <source
                                  src={exerciseVideo}
                                  type="video/mp4"
                                />

                                Your browser does not
                                support video playback.
                              </video>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutDetails;