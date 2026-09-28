import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Activity,
  BarChart3,
  Clock3,
  Dumbbell,
  Flame,
  Layers3,
  Target,
  Trophy,
} from "lucide-react";

import { getProgressDashboard } from "../../store/slices/workoutSlice";

const Progress = () => {
  const dispatch = useDispatch();

  const {
    progressDashboard,
    progressDashboardLoading,
    progressDashboardError,
  } = useSelector((state) => state.workout);

  useEffect(() => {
    dispatch(getProgressDashboard());
  }, [dispatch]);

  if (progressDashboardLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 px-4 py-8 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="h-8 w-48 animate-pulse rounded-lg bg-zinc-800" />
            <div className="mt-3 h-4 w-72 animate-pulse rounded bg-zinc-800" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-32 animate-pulse rounded-2xl bg-zinc-900"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (progressDashboardError) {
    return (
      <div className="min-h-screen bg-zinc-950 px-4 py-8 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-900/50 bg-red-950/20 p-6">
            <h2 className="text-lg font-semibold">
              Failed to load progress
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              {progressDashboardError}
            </p>

            <button
              onClick={() => dispatch(getProgressDashboard())}
              className="mt-5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!progressDashboard) {
    return null;
  }

  const {
    overview = {},
    thisWeek = {},
    lastWeek = {},
    muscleGroups = {},
    topExercises = [],
    recentWorkouts = [],
  } = progressDashboard;

  const formatNumber = (value = 0) => {
    return new Intl.NumberFormat("en-IN").format(value);
  };

  const formatDuration = (minutes = 0) => {
    if (!minutes) return "0 min";

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes} min`;
    }

    if (remainingMinutes === 0) {
      return `${hours} hr`;
    }

    return `${hours} hr ${remainingMinutes} min`;
  };

  const formatVolume = (volume = 0) => {
    if (!volume) return "0 kg";

    return `${formatNumber(volume)} kg`;
  };

  const formatDate = (date) => {
    if (!date) return "Unknown date";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const statCards = [
    {
      title: "Workouts",
      value: formatNumber(overview.totalWorkouts),
      icon: Dumbbell,
      description: "Completed workouts",
    },
    {
      title: "Duration",
      value: formatDuration(overview.totalDuration),
      icon: Clock3,
      description: "Total training time",
    },
    {
      title: "Volume",
      value: formatVolume(overview.totalVolume),
      icon: BarChart3,
      description: "Total lifted",
    },
    {
      title: "Sets",
      value: formatNumber(overview.totalSets),
      icon: Layers3,
      description: "Completed sets",
    },
    {
      title: "Reps",
      value: formatNumber(overview.totalReps),
      icon: Activity,
      description: "Completed reps",
    },
  ];

  const muscleGroupEntries = Object.entries(
    muscleGroups
  );

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black">
              <Target size={22} />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Progress
              </h1>

              <p className="mt-1 text-sm text-zinc-400">
                Track your training performance and progress.
              </p>
            </div>
          </div>
        </div>

        {/* OVERVIEW STATS */}
        <section className="mb-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {statCards.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-sm text-zinc-400">
                      {stat.title}
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800">
                      <Icon size={18} className="text-zinc-300" />
                    </div>
                  </div>

                  <p className="text-2xl font-bold">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* WEEKLY COMPARISON */}
        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">
              Weekly Progress
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Compare your current week with the previous week.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* THIS WEEK */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">
                    This Week
                  </p>

                  <h3 className="mt-1 text-xl font-semibold">
                    Current progress
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                  <Flame size={20} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <WeeklyStat
                  label="Workouts"
                  value={thisWeek.workouts}
                />

                <WeeklyStat
                  label="Duration"
                  value={formatDuration(
                    thisWeek.duration
                  )}
                />

                <WeeklyStat
                  label="Volume"
                  value={formatVolume(
                    thisWeek.volume
                  )}
                />
              </div>
            </div>

            {/* LAST WEEK */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">
                    Last Week
                  </p>

                  <h3 className="mt-1 text-xl font-semibold">
                    Previous progress
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800">
                  <BarChart3 size={20} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <WeeklyStat
                  label="Workouts"
                  value={lastWeek.workouts}
                />

                <WeeklyStat
                  label="Duration"
                  value={formatDuration(
                    lastWeek.duration
                  )}
                />

                <WeeklyStat
                  label="Volume"
                  value={formatVolume(
                    lastWeek.volume
                  )}
                />
              </div>
            </div>
          </div>
        </section>

        {/* MUSCLE GROUPS */}
        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">
              Muscle Groups
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Your training distribution by muscle group.
            </p>
          </div>

          {muscleGroupEntries.length === 0 ? (
            <EmptyState
              icon={Dumbbell}
              title="No muscle group data"
              description="Complete a workout to start tracking your training distribution."
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {muscleGroupEntries.map(
                ([muscleGroup, count]) => (
                  <div
                    key={muscleGroup}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium capitalize">
                          {muscleGroup}
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          Exercise entries
                        </p>
                      </div>

                      <span className="text-2xl font-bold">
                        {count}
                      </span>
                    </div>

                    <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-white"
                        style={{
                          width: `${Math.min(
                            count * 20,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </section>

        {/* TOP EXERCISES */}
        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">
              Top Exercises
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Exercises with the highest total training volume.
            </p>
          </div>

          {topExercises.length === 0 ? (
            <EmptyState
              icon={Trophy}
              title="No exercise data"
              description="Complete exercises with recorded sets to see your top exercises."
            />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
              <div className="hidden grid-cols-[60px_1fr_150px_150px_150px] gap-4 border-b border-zinc-800 px-6 py-4 text-xs font-medium uppercase tracking-wider text-zinc-500 sm:grid">
                <span>#</span>
                <span>Exercise</span>
                <span>Sets</span>
                <span>Max Weight</span>
                <span>Volume</span>
              </div>

              {topExercises.map(
                (exercise, index) => (
                  <div
                    key={
                      exercise.exerciseId ||
                      exercise.exerciseName
                    }
                    className="grid grid-cols-1 gap-4 border-b border-zinc-800 px-6 py-5 last:border-b-0 sm:grid-cols-[60px_1fr_150px_150px_150px] sm:items-center"
                  >
                    <div className="text-sm font-semibold text-zinc-500">
                      #{index + 1}
                    </div>

                    <div>
                      <p className="font-semibold">
                        {exercise.exerciseName}
                      </p>

                      <p className="mt-1 text-xs capitalize text-zinc-500">
                        {exercise.muscleGroup ||
                          "Unknown muscle group"}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-zinc-500 sm:hidden">
                        Sets:{" "}
                      </span>

                      <span className="font-medium">
                        {exercise.totalSets}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-zinc-500 sm:hidden">
                        Max Weight:{" "}
                      </span>

                      <span className="font-medium">
                        {exercise.maxWeight} kg
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-zinc-500 sm:hidden">
                        Volume:{" "}
                      </span>

                      <span className="font-semibold">
                        {formatVolume(
                          exercise.totalVolume
                        )}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </section>

        {/* RECENT WORKOUTS */}
        <section className="pb-10">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">
              Recent Workouts
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Your latest completed workouts.
            </p>
          </div>

          {recentWorkouts.length === 0 ? (
            <EmptyState
              icon={Clock3}
              title="No completed workouts"
              description="Complete your first workout to see it here."
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentWorkouts.map((workout) => (
                <div
                  key={workout._id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">
                        {workout.name}
                      </h3>

                      <p className="mt-1 text-sm text-zinc-500">
                        {formatDate(
                          workout.completedAt
                        )}
                      </p>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
                      <Dumbbell size={17} />
                    </div>
                  </div>

                  <div className="mt-5 border-t border-zinc-800 pt-4">
                    <p className="text-xs text-zinc-500">
                      Duration
                    </p>

                    <p className="mt-1 font-medium">
                      {formatDuration(
                        workout.duration
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const WeeklyStat = ({ label, value }) => {
  return (
    <div className="rounded-xl bg-zinc-800/60 p-4">
      <p className="text-xs text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-lg font-semibold">
        {value}
      </p>
    </div>
  );
};

const EmptyState = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800">
        <Icon size={22} className="text-zinc-400" />
      </div>

      <h3 className="mt-4 font-semibold">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
        {description}
      </p>
    </div>
  );
};

export default Progress;