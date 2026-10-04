import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  generateWorkout,
  clearWorkout,
} from "../../store/slices/aiSlice";
import {
  BrainCircuit,
  Dumbbell,
  Sparkles,
  Clock3,
  RotateCcw,
  LoaderCircle,
} from "lucide-react";

const muscleGroups = [
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Legs",
  "Abs",
];

const difficulties = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

const goals = [
  "Muscle Gain",
  "Strength",
  "Fat Loss",
  "General Fitness",
];

const equipmentOptions = [
  "Dumbbells and Bench",
  "Barbell and Bench",
  "Gym Equipment",
  "Bodyweight",
  "Minimal Equipment",
];

function AIWorkoutGenerator() {
  const dispatch = useDispatch();

  const { workout, loading, error } = useSelector(
    (state) => state.ai
  );

  const [formData, setFormData] = useState({
    muscleGroup: "Chest",
    difficulty: "Beginner",
    goal: "Muscle Gain",
    equipment: "Dumbbells and Bench",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = (e) => {
    e.preventDefault();

    dispatch(generateWorkout(formData));
  };

  const handleReset = () => {
    dispatch(clearWorkout());

    setFormData({
      muscleGroup: "Chest",
      difficulty: "Beginner",
      goal: "Muscle Gain",
      equipment: "Dumbbells and Bench",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black">
              <BrainCircuit size={23} />
            </div>

            <div>
              <p className="text-sm font-medium text-zinc-400">
                IRONMIND AI
              </p>

              <h1 className="text-2xl font-bold sm:text-3xl">
                AI Workout Generator
              </h1>
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-6 text-zinc-400">
            Create a personalized workout based on your muscle
            group, fitness goal, experience level, and available
            equipment.
          </p>
        </div>

        {/* Generator Form */}
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">

          <div className="h-fit rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="mb-5 flex items-center gap-2">
              <Sparkles size={18} />

              <h2 className="font-semibold">
                Workout Preferences
              </h2>
            </div>

            <form
              onSubmit={handleGenerate}
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
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none transition focus:border-white"
                >
                  {muscleGroups.map((muscle) => (
                    <option key={muscle} value={muscle}>
                      {muscle}
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
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none transition focus:border-white"
                >
                  {difficulties.map((difficulty) => (
                    <option
                      key={difficulty}
                      value={difficulty}
                    >
                      {difficulty}
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
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none transition focus:border-white"
                >
                  {goals.map((goal) => (
                    <option key={goal} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
              </div>

              {/* Equipment */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Equipment
                </label>

                <select
                  name="equipment"
                  value={formData.equipment}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none transition focus:border-white"
                >
                  {equipmentOptions.map((equipment) => (
                    <option
                      key={equipment}
                      value={equipment}
                    >
                      {equipment}
                    </option>
                  ))}
                </select>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-900 bg-red-950/30 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Generate */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
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

              {workout && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
                >
                  <RotateCcw size={16} />
                  Start Over
                </button>
              )}
            </form>
          </div>

          {/* Result */}
          <div>
            {!workout && !loading && (
              <div className="flex min-h-[500px] items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/50 p-8 text-center">
                <div className="max-w-sm">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-800">
                    <Dumbbell
                      size={28}
                      className="text-zinc-400"
                    />
                  </div>

                  <h3 className="mb-2 text-lg font-semibold">
                    Your AI workout will appear here
                  </h3>

                  <p className="text-sm leading-6 text-zinc-500">
                    Select your preferences and let IronMind AI
                    create a personalized workout for you.
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="flex min-h-[500px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
                <div className="text-center">
                  <LoaderCircle
                    size={36}
                    className="mx-auto mb-4 animate-spin text-zinc-300"
                  />

                  <p className="font-medium">
                    IronMind AI is creating your workout...
                  </p>

                  <p className="mt-2 text-sm text-zinc-500">
                    This may take a few seconds.
                  </p>
                </div>
              </div>
            )}

            {workout && !loading && (
              <div className="space-y-5">

                {/* Workout Header */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
                        AI Generated Workout
                      </p>

                      <h2 className="text-2xl font-bold">
                        {workout.workoutName}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300">
                      <Sparkles size={13} />
                      IronMind AI
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-zinc-400">
                    {workout.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                      {workout.muscleGroup}
                    </span>

                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                      {workout.difficulty}
                    </span>

                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                      {formData.goal}
                    </span>
                  </div>
                </div>

                {/* Exercises */}
                <div className="space-y-4">
                  {workout.exercises?.map(
                    (exercise, index) => (
                      <div
                        key={`${exercise.name}-${index}`}
                        className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
                      >
                        <div className="flex gap-4">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold text-black">
                            {index + 1}
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="text-lg font-semibold">
                              {exercise.name}
                            </h3>

                            <div className="mt-3 flex flex-wrap gap-2">
                              <span className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300">
                                {exercise.sets} Sets
                              </span>

                              <span className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300">
                                {exercise.reps} Reps
                              </span>

                              <span className="flex items-center gap-1 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300">
                                <Clock3 size={13} />
                                {exercise.restTime}s Rest
                              </span>
                            </div>

                            <p className="mt-4 text-sm leading-6 text-zinc-400">
                              {exercise.instructions}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
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