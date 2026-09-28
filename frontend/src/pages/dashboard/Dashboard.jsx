import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Activity,
  CalendarDays,
  Dumbbell,
  Flame,
  Target,
  TrendingUp,
  Weight,
} from "lucide-react";

import { getProgressDashboard } from "../../store/slices/workoutSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    progressDashboard,
    progressDashboardLoading,
    progressDashboardError,
  } = useSelector((state) => state.workout);

  useEffect(() => {
    dispatch(getProgressDashboard());
  }, [dispatch]);

  const overview = progressDashboard?.overview || {
    totalWorkouts: 0,
    totalDuration: 0,
    totalVolume: 0,
    totalSets: 0,
    totalReps: 0,
  };

  const thisWeek = progressDashboard?.thisWeek || {
    workouts: 0,
    duration: 0,
    volume: 0,
  };

  const recentWorkouts =
    progressDashboard?.recentWorkouts || [];

  const topExercises =
    progressDashboard?.topExercises || [];

  const muscleGroups =
    progressDashboard?.muscleGroups || {};

  const formatDuration = (minutes) => {
    if (!minutes) return "0 min";

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) {
      return `${mins} min`;
    }

    if (mins === 0) {
      return `${hours} hr`;
    }

    return `${hours} hr ${mins} min`;
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-IN").format(
      number || 0
    );
  };

  const getPercentage = (value, max) => {
    if (!max) return 0;

    return Math.min((value / max) * 100, 100);
  };

  const maxMuscleGroupValue = Math.max(
    ...Object.values(muscleGroups),
    1
  );

  if (progressDashboardLoading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-9 w-48 animate-pulse rounded bg-zinc-800" />
          <div className="mt-3 h-5 w-80 animate-pulse rounded bg-zinc-800" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-2xl bg-zinc-900"
            />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-80 animate-pulse rounded-2xl bg-zinc-900" />
          <div className="h-80 animate-pulse rounded-2xl bg-zinc-900" />
        </div>
      </div>
    );
  }

  if (progressDashboardError) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
        <h2 className="text-lg font-bold text-red-400">
          Failed to load dashboard
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          {progressDashboardError}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}

      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-black">
            <Dumbbell size={22} strokeWidth={2.5} />
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Track your workouts and monitor your progress.
            </p>
          </div>
        </div>
      </div>

      {/* ================= QUICK STATS ================= */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Workouts */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <Dumbbell size={20} />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
              Lifetime
            </span>
          </div>

          <p className="mt-5 text-3xl font-black text-white">
            {formatNumber(overview.totalWorkouts)}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Workouts completed
          </p>
        </div>

        {/* Volume */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <Weight size={20} />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
              Volume
            </span>
          </div>

          <p className="mt-5 text-3xl font-black text-white">
            {formatNumber(overview.totalVolume)}
            <span className="ml-1 text-sm font-medium text-zinc-500">
              kg
            </span>
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Total weight moved
          </p>
        </div>

        {/* Sets */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <Target size={20} />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
              Training
            </span>
          </div>

          <p className="mt-5 text-3xl font-black text-white">
            {formatNumber(overview.totalSets)}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Total sets completed
          </p>
        </div>

        {/* Duration */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <Activity size={20} />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
              Time
            </span>
          </div>

          <p className="mt-5 text-3xl font-black text-white">
            {formatDuration(overview.totalDuration)}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Total training time
          </p>
        </div>
      </div>

      {/* ================= THIS WEEK ================= */}

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <CalendarDays
                size={19}
                className="text-orange-500"
              />

              <h2 className="text-xl font-bold text-white">
                This Week
              </h2>
            </div>

            <p className="mt-1 text-sm text-zinc-500">
              Your training activity for the current week.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-500">
            <Flame size={16} />
            {thisWeek.workouts} workouts
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-zinc-950 p-4">
            <p className="text-sm text-zinc-500">
              Workouts
            </p>

            <p className="mt-2 text-2xl font-black text-white">
              {thisWeek.workouts}
            </p>
          </div>

          <div className="rounded-xl bg-zinc-950 p-4">
            <p className="text-sm text-zinc-500">
              Training Time
            </p>

            <p className="mt-2 text-2xl font-black text-white">
              {formatDuration(thisWeek.duration)}
            </p>
          </div>

          <div className="rounded-xl bg-zinc-950 p-4">
            <p className="text-sm text-zinc-500">
              Volume
            </p>

            <p className="mt-2 text-2xl font-black text-white">
              {formatNumber(thisWeek.volume)}
              <span className="ml-1 text-sm font-medium text-zinc-500">
                kg
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ================= RECENT + TOP EXERCISES ================= */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Workouts */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">
                Recent Workouts
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Your latest completed sessions.
              </p>
            </div>

            <TrendingUp
              size={20}
              className="text-orange-500"
            />
          </div>

          {recentWorkouts.length === 0 ? (
            <div className="flex min-h-48 items-center justify-center">
              <p className="text-sm text-zinc-600">
                No completed workouts yet.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {recentWorkouts.slice(0, 5).map((workout) => (
                <div
                  key={workout._id}
                  className="flex items-center justify-between rounded-xl bg-zinc-950 p-4"
                >
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-white">
                      {workout.name}
                    </h3>

                    <p className="mt-1 text-xs text-zinc-500">
                      {workout.completedAt
                        ? new Date(
                            workout.completedAt
                          ).toLocaleDateString()
                        : "Completed"}
                    </p>
                  </div>

                  <div className="ml-4 text-right">
                    <p className="font-bold text-orange-500">
                      {formatDuration(
                        workout.duration
                      )}
                    </p>

                    <p className="text-xs text-zinc-600">
                      duration
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Exercises */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <div>
            <h2 className="text-xl font-bold text-white">
              Top Exercises
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Exercises with the highest training volume.
            </p>
          </div>

          {topExercises.length === 0 ? (
            <div className="flex min-h-48 items-center justify-center">
              <p className="text-sm text-zinc-600">
                No exercise data yet.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              {topExercises.slice(0, 5).map(
                (exercise, index) => {
                  const maxVolume =
                    topExercises[0]?.totalVolume || 1;

                  const percentage =
                    getPercentage(
                      exercise.totalVolume,
                      maxVolume
                    );

                  return (
                    <div key={index}>
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-xs font-bold text-zinc-400">
                            {index + 1}
                          </span>

                          <span className="truncate text-sm font-semibold text-white">
                            {exercise.name}
                          </span>
                        </div>

                        <span className="ml-3 text-sm font-bold text-orange-500">
                          {formatNumber(
                            exercise.totalVolume
                          )}{" "}
                          kg
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                        <div
                          className="h-full rounded-full bg-orange-500 transition-all"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>

      {/* ================= MUSCLE GROUPS ================= */}

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <div>
          <h2 className="text-xl font-bold text-white">
            Muscle Groups
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Your training distribution across muscle groups.
          </p>
        </div>

        {Object.keys(muscleGroups).length === 0 ? (
          <div className="flex min-h-32 items-center justify-center">
            <p className="text-sm text-zinc-600">
              No muscle group data yet.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(muscleGroups).map(
              ([muscle, value]) => (
                <div
                  key={muscle}
                  className="rounded-xl bg-zinc-950 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold capitalize text-white">
                      {muscle}
                    </span>

                    <span className="text-sm font-bold text-orange-500">
                      {value}
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-orange-500"
                      style={{
                        width: `${getPercentage(
                          value,
                          maxMuscleGroupValue
                        )}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-zinc-600">
                    exercise sessions
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;