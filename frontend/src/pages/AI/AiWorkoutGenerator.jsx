import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  generateWorkout,
  saveWorkout,
  clearWorkout,
  clearSaveStatus,
} from "../../store/slices/aiSlice";

import {
  BrainCircuit,
  Dumbbell,
  Sparkles,
  Clock3,
  RotateCcw,
  LoaderCircle,
  Save,
  CheckCircle2,
} from "lucide-react";

const muscleGroups = [
  { label: "Chest", value: "chest" },
  { label: "Back", value: "back" },
  { label: "Shoulders", value: "shoulders" },
  { label: "Biceps", value: "biceps" },
  { label: "Triceps", value: "triceps" },
  { label: "Legs", value: "legs" },
  { label: "Abs", value: "abs" },
];

const difficulties = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
];

const goals = [
  { label: "Muscle Gain", value: "muscle gain" },
  { label: "Strength", value: "strength" },
  { label: "Fat Loss", value: "fat loss" },
  { label: "General Fitness", value: "general fitness" },
];

const equipmentOptions = [
  { label: "Dumbbells", value: "dumbbell" },
  { label: "Barbell", value: "barbell" },
  { label: "Machines", value: "machine" },
  { label: "Cable", value: "cable" },
  { label: "Bodyweight", value: "bodyweight" },
  { label: "Resistance Band", value: "resistance_band" },
];

function AIWorkoutGenerator() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    workout,
    loading,
    error,
    saving,
    saveError,
    saveSuccess,
  } = useSelector((state) => state.ai);

  const [formData, setFormData] = useState({
    muscleGroup: "chest",
    difficulty: "beginner",
    goal: "muscle gain",
    equipment: ["dumbbell"],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEquipmentToggle = (equipment) => {
    setFormData((prev) => {
      const alreadySelected =
        prev.equipment.includes(equipment);

      // Don't allow all equipment to be deselected
      if (alreadySelected) {
        if (prev.equipment.length === 1) {
          return prev;
        }

        return {
          ...prev,
          equipment: prev.equipment.filter(
            (item) => item !== equipment
          ),
        };
      }

      return {
        ...prev,
        equipment: [
          ...prev.equipment,
          equipment,
        ],
      };
    });
  };

  const handleGenerateWorkout = async (event) => {
    event.preventDefault();

    dispatch(clearSaveStatus());

    await dispatch(
      generateWorkout({
        muscleGroup: formData.muscleGroup,
        difficulty: formData.difficulty,
        goal: formData.goal,
        equipment: formData.equipment,
      })
    );
  };

  const handleReset = () => {
    setFormData({
      muscleGroup: "chest",
      difficulty: "beginner",
      goal: "muscle gain",
      equipment: ["dumbbell"],
    });

    dispatch(clearWorkout());
    dispatch(clearSaveStatus());
  };

  const handleSaveWorkout = async () => {
    if (!workout || !workout.exercises?.length) {
      return;
    }

    const workoutData = {
      workoutName: workout.workoutName,
      description: workout.description,
      exercises: workout.exercises.map((exercise) => ({
        exerciseId: exercise.exerciseId,
        name: exercise.name,
        sets: exercise.sets,
        reps: exercise.reps,
        restTime: exercise.restTime,
      })),
    };

    const result = await dispatch(
      saveWorkout(workoutData)
    );

    if (saveWorkout.fulfilled.match(result)) {
      setTimeout(() => {
        navigate("/workouts");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black">
              <BrainCircuit size={23} />
            </div>

            <div>
              <p className="text-sm font-medium text-zinc-400">
                IronMind AI
              </p>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                AI Workout Generator
              </h1>
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
            Tell IronMind what you want to train, your fitness
            level, your goal, and the equipment available to you.
            AI will create a personalized workout.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          {/* Generator Form */}
          <div className="h-fit rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                Workout Preferences
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Choose your preferences
              </p>
            </div>

            <form
              onSubmit={handleGenerateWorkout}
              className="space-y-5"
            >
              {/* Muscle Group */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Muscle Group
                </label>

                <select
                  name="muscleGroup"
                  value={formData.muscleGroup}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-zinc-400"
                >
                  {muscleGroups.map((muscle) => (
                    <option
                      key={muscle.value}
                      value={muscle.value}
                    >
                      {muscle.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Difficulty
                </label>

                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-zinc-400"
                >
                  {difficulties.map((difficulty) => (
                    <option
                      key={difficulty.value}
                      value={difficulty.value}
                    >
                      {difficulty.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Goal */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Goal
                </label>

                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-zinc-400"
                >
                  {goals.map((goal) => (
                    <option
                      key={goal.value}
                      value={goal.value}
                    >
                      {goal.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Equipment */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Equipment Available
                </label>

                <p className="mb-3 text-xs text-zinc-500">
                  Select all equipment you have access to.
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {equipmentOptions.map((equipment) => {
                    const selected =
                      formData.equipment.includes(
                        equipment.value
                      );

                    return (
                      <button
                        key={equipment.value}
                        type="button"
                        onClick={() =>
                          handleEquipmentToggle(
                            equipment.value
                          )
                        }
                        className={`rounded-xl border px-3 py-3 text-left text-sm transition ${
                          selected
                            ? "border-white bg-white text-black"
                            : "border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-zinc-500"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span>
                            {equipment.label}
                          </span>

                          {selected && (
                            <span className="font-bold">
                              ✓
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <p className="mt-3 text-xs text-zinc-500">
                  {formData.equipment.length}{" "}
                  {formData.equipment.length === 1
                    ? "equipment type"
                    : "equipment types"}{" "}
                  selected
                </p>
              </div>

              {/* Selected Equipment */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Selected Equipment
                </p>

                <div className="flex flex-wrap gap-2">
                  {formData.equipment.map(
                    (equipment) => (
                      <span
                        key={equipment}
                        className="rounded-full bg-zinc-800 px-3 py-1 text-xs capitalize text-zinc-300"
                      >
                        {equipment.replace(
                          "_",
                          " "
                        )}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <LoaderCircle
                        size={18}
                        className="animate-spin"
                      />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Generate Workout
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-300 transition hover:border-zinc-500 hover:text-white"
                  title="Reset"
                >
                  <RotateCcw size={18} />
                </button>
              </div>
            </form>
          </div>

          {/* Generated Workout */}
          <div>
            {!workout && !loading && (
              <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/30 p-8 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-zinc-500">
                  <Dumbbell size={30} />
                </div>

                <h2 className="text-lg font-semibold text-zinc-300">
                  Your workout will appear here
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600">
                  Select your preferences and let IronMind AI
                  build a workout based on your goals and
                  available equipment.
                </p>
              </div>
            )}

            {loading && (
              <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900/30 p-8 text-center">
                <LoaderCircle
                  size={40}
                  className="mb-5 animate-spin text-white"
                />

                <h2 className="text-lg font-semibold">
                  Building your workout...
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                  IronMind AI is creating a workout based on
                  your preferences.
                </p>
              </div>
            )}

            {workout && !loading && (
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6">
                {/* Workout Header */}
                <div className="mb-6 border-b border-zinc-800 pb-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                      AI Generated
                    </span>

                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs capitalize text-zinc-400">
                      {workout.difficulty}
                    </span>

                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs capitalize text-zinc-400">
                      {workout.muscleGroup}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight">
                    {workout.workoutName}
                  </h2>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-500">
                    {workout.description}
                  </p>

                  {/* Equipment */}
                  <div className="mt-4">
                    <p className="mb-2 text-xs uppercase tracking-wider text-zinc-600">
                      Equipment
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {formData.equipment.map(
                        (equipment) => (
                          <span
                            key={equipment}
                            className="rounded-full bg-zinc-800 px-3 py-1 text-xs capitalize text-zinc-300"
                          >
                            {equipment.replace(
                              "_",
                              " "
                            )}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Exercises */}
                <div className="space-y-3">
                  {workout.exercises?.map(
                    (exercise, index) => (
                      <div
                        key={
                          exercise.exerciseId ||
                          index
                        }
                        className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 transition hover:border-zinc-700"
                      >
                        <div className="flex gap-4">
                          {/* Number */}
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-sm font-bold text-zinc-300">
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-white">
                              {exercise.name}
                            </h3>

                            {/* Stats */}
                            <div className="mt-3 flex flex-wrap gap-2">
                              <span className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400">
                                {exercise.sets} Sets
                              </span>

                              <span className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400">
                                {exercise.reps} Reps
                              </span>

                              <span className="flex items-center gap-1 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400">
                                <Clock3 size={13} />
                                {exercise.restTime}s
                                Rest
                              </span>
                            </div>

                            {/* Instructions */}
                            {exercise.instructions && (
                              <p className="mt-3 text-xs leading-5 text-zinc-600">
                                {exercise.instructions}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* Save Section */}
                <div className="mt-6 border-t border-zinc-800 pt-6">
                  {saveError && (
                    <div className="mb-4 rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
                      {saveError}
                    </div>
                  )}

                  {saveSuccess && (
                    <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-900/50 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-400">
                      <CheckCircle2 size={18} />
                      Workout saved successfully. Redirecting...
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleSaveWorkout}
                    disabled={
                      saving || saveSuccess
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <LoaderCircle
                          size={18}
                          className="animate-spin"
                        />
                        Saving Workout...
                      </>
                    ) : saveSuccess ? (
                      <>
                        <CheckCircle2 size={18} />
                        Workout Saved
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Save Workout
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIWorkoutGenerator;