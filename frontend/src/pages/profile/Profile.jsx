import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Mail,
  Dumbbell,
  Clock3,
  Weight,
  Target,
  CalendarDays,
  Activity,
  LogOut,
  ShieldCheck,
  Trophy,
} from "lucide-react";

import {
  getProfile,
  logout,
} from "../../store/slices/authSlice";

import {
  getProgressDashboard,
} from "../../store/slices/workoutSlice";

const Profile = () => {
  const dispatch = useDispatch();

  // =========================
  // AUTH STATE
  // =========================

  const {
    user,
    profileLoading,
  } = useSelector(
    (state) => state.auth
  );

  // =========================
  // WORKOUT STATE
  // =========================

  const {
    progressDashboard,
    progressDashboardLoading,
  } = useSelector(
    (state) => state.workout
  );

  // =========================
  // FETCH PROFILE + PROGRESS
  // =========================

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getProgressDashboard());
  }, [dispatch]);

  // =========================
  // OVERVIEW
  // =========================

  const overview =
    progressDashboard?.overview || {
      totalWorkouts: 0,
      totalDuration: 0,
      totalVolume: 0,
      totalSets: 0,
      totalReps: 0,
    };

  // =========================
  // FORMAT NUMBER
  // =========================

  const formatNumber = (number) => {
    return new Intl.NumberFormat(
      "en-IN"
    ).format(number || 0);
  };

  // =========================
  // FORMAT DURATION
  // =========================

  const formatDuration = (minutes) => {
    if (!minutes) {
      return "0 min";
    }

    const hours = Math.floor(
      minutes / 60
    );

    const mins = minutes % 60;

    if (hours === 0) {
      return `${mins} min`;
    }

    if (mins === 0) {
      return `${hours} hr`;
    }

    return `${hours} hr ${mins} min`;
  };

  // =========================
  // USER INITIAL
  // =========================

  const getInitial = () => {
    const name =
      user?.name || "U";

    return name
      .charAt(0)
      .toUpperCase();
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    dispatch(logout());

    window.location.href = "/login";
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-10">

      {/* =========================
          HEADER
      ========================= */}

      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">
          Profile
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Manage your account and view your
          training summary.
        </p>
      </div>

      {/* =========================
          PROFILE CARD
      ========================= */}

      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60">

        <div className="border-b border-zinc-800 p-6 sm:p-8">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

            {/* AVATAR */}

            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-orange-500 text-4xl font-black text-black">
              {getInitial()}
            </div>

            {/* USER INFO */}

            <div className="min-w-0 flex-1">

              <div className="flex flex-wrap items-center gap-3">

                <h2 className="text-2xl font-black text-white">
                  {user?.name ||
                    "IronMind User"}
                </h2>

                <span className="flex items-center gap-1 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-500">
                  <ShieldCheck
                    size={13}
                  />

                  Member
                </span>

              </div>

              <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-500">

                <div className="flex items-center gap-2">
                  <Mail size={16} />

                  <span>
                    {user?.email ||
                      "No email available"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Target size={16} />

                  <span>
                    Goal:{" "}
                    {user?.goal ||
                      "Not specified"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Activity size={16} />

                  <span>
                    Experience:{" "}
                    {user?.experience ||
                      "Not specified"}
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* =========================
            ACCOUNT DETAILS
        ========================= */}

        <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">

          {/* NAME */}

          <div className="rounded-xl bg-zinc-950 p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-orange-500">
                <User size={18} />
              </div>

              <div>

                <p className="text-xs uppercase tracking-wider text-zinc-600">
                  Name
                </p>

                <p className="mt-1 font-semibold text-white">
                  {user?.name ||
                    "Not available"}
                </p>

              </div>

            </div>

          </div>

          {/* EMAIL */}

          <div className="rounded-xl bg-zinc-950 p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-orange-500">
                <Mail size={18} />
              </div>

              <div className="min-w-0">

                <p className="text-xs uppercase tracking-wider text-zinc-600">
                  Email
                </p>

                <p className="mt-1 truncate font-semibold text-white">
                  {user?.email ||
                    "Not available"}
                </p>

              </div>

            </div>

          </div>

          {/* GOAL */}

          <div className="rounded-xl bg-zinc-950 p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-orange-500">
                <Target size={18} />
              </div>

              <div>

                <p className="text-xs uppercase tracking-wider text-zinc-600">
                  Fitness Goal
                </p>

                <p className="mt-1 font-semibold capitalize text-white">
                  {user?.goal ||
                    "Not specified"}
                </p>

              </div>

            </div>

          </div>

          {/* EXPERIENCE */}

          <div className="rounded-xl bg-zinc-950 p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-orange-500">
                <Dumbbell size={18} />
              </div>

              <div>

                <p className="text-xs uppercase tracking-wider text-zinc-600">
                  Experience
                </p>

                <p className="mt-1 font-semibold capitalize text-white">
                  {user?.experience ||
                    "Not specified"}
                </p>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* =========================
          FITNESS SUMMARY
      ========================= */}

      <div>

        <div className="mb-4">

          <h2 className="text-xl font-bold text-white">
            Fitness Summary
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Your lifetime training statistics.
          </p>

        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* WORKOUTS */}

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <Dumbbell size={20} />
            </div>

            <p className="mt-5 text-3xl font-black text-white">
              {formatNumber(
                overview.totalWorkouts
              )}
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Workouts completed
            </p>

          </div>

          {/* VOLUME */}

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <Weight size={20} />
            </div>

            <p className="mt-5 text-3xl font-black text-white">
              {formatNumber(
                overview.totalVolume
              )}

              <span className="ml-1 text-sm font-medium text-zinc-500">
                kg
              </span>
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Total volume
            </p>

          </div>

          {/* SETS */}

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <Target size={20} />
            </div>

            <p className="mt-5 text-3xl font-black text-white">
              {formatNumber(
                overview.totalSets
              )}
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Sets completed
            </p>

          </div>

          {/* DURATION */}

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <Clock3 size={20} />
            </div>

            <p className="mt-5 text-3xl font-black text-white">
              {formatDuration(
                overview.totalDuration
              )}
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Training time
            </p>

          </div>

        </div>
      </div>

      {/* =========================
          TRAINING STATUS
      ========================= */}

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <Trophy size={20} />
            </div>

            <div>

              <h3 className="font-bold text-white">
                Keep pushing
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                Every workout adds to your progress.
              </p>

            </div>

          </div>

          {/* LOGOUT */}

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={17} />

            Logout
          </button>

        </div>
      </div>

      {/* =========================
          LOADING
      ========================= */}

      {(profileLoading ||
        progressDashboardLoading) && (
        <p className="text-center text-xs text-zinc-600">
          Updating your profile...
        </p>
      )}

    </div>
  );
};

export default Profile;