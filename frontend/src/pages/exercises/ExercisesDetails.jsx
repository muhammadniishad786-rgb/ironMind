import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Dumbbell,
  Play,
  ExternalLink,
  Loader2,
} from "lucide-react";

import { getExerciseById } from "../../store/slices/exerciseSlice";

const ExerciseDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    selectedExercise,
    detailsLoading,
    detailsError,
  } = useSelector((state) => state.exercise);

  useEffect(() => {
    dispatch(getExerciseById(id));
  }, [dispatch, id]);

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
            Loading exercise...
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
          to="/exercises"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Exercises
        </Link>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
          <p className="text-sm text-red-400">
            {detailsError}
          </p>
        </div>
      </div>
    );
  }

  if (!selectedExercise) {
    return null;
  }

  const exercise = selectedExercise;

  const formatText = (value) => {
    return value
      ?.replaceAll("_", " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };

  return (
    <div className="space-y-8">
      {/* =========================
          BACK BUTTON
      ========================= */}

      <Link
        to="/exercises"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
      >
        <ArrowLeft size={17} />
        Back to Exercises
      </Link>

      {/* =========================
          HEADER
      ========================= */}

      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
            <Dumbbell size={23} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              {exercise.name}
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Exercise details and instructions
            </p>
          </div>
        </div>
      </div>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* =========================
            MEDIA
        ========================= */}

        <div className="space-y-6 lg:col-span-2">
          {/* IMAGE */}

          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
            {exercise.image ? (
              <img
                src={exercise.image}
                alt={exercise.name}
                className="h-[320px] w-full object-cover sm:h-[420px]"
              />
            ) : (
              <div className="flex h-[320px] items-center justify-center bg-zinc-950 sm:h-[420px]">
                <div className="text-center">
                  <Dumbbell
                    size={48}
                    className="mx-auto text-zinc-700"
                  />

                  <p className="mt-3 text-sm text-zinc-600">
                    No exercise image available
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* VIDEO */}

          {exercise.videoUrl && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="mb-4 flex items-center gap-2">
                <Play
                  size={18}
                  className="text-orange-500"
                />

                <h2 className="font-semibold text-white">
                  Exercise Video
                </h2>
              </div>

              <div className="overflow-hidden rounded-xl bg-black">
                <video
                  controls
                  poster={
                    exercise.videoThumbnail ||
                    undefined
                  }
                  className="max-h-[500px] w-full"
                >
                  <source
                    src={exercise.videoUrl}
                    type="video/mp4"
                  />

                  Your browser does not support
                  video playback.
                </video>
              </div>

              <a
                href={exercise.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-orange-500 transition hover:text-orange-400"
              >
                Open video link
                <ExternalLink size={15} />
              </a>
            </div>
          )}

          {/* VIDEO LINK ONLY */}

          {!exercise.videoUrl &&
            exercise.videoThumbnail && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Play
                    size={18}
                    className="text-orange-500"
                  />

                  <h2 className="font-semibold text-white">
                    Exercise Video
                  </h2>
                </div>

                <img
                  src={exercise.videoThumbnail}
                  alt={`${exercise.name} video`}
                  className="max-h-[400px] w-full rounded-xl object-cover"
                />

                <p className="mt-4 text-sm text-zinc-500">
                  A video thumbnail is available,
                  but no video URL has been added yet.
                </p>
              </div>
            )}
        </div>

        {/* =========================
            INFO SIDEBAR
        ========================= */}

        <div className="space-y-6">
          {/* INFO */}

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="mb-5 text-lg font-semibold text-white">
              Exercise Info
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-zinc-600">
                  Muscle Group
                </p>

                <p className="mt-1 text-sm font-medium capitalize text-zinc-200">
                  {formatText(
                    exercise.muscleGroup
                  )}
                </p>
              </div>

              <div className="border-t border-zinc-800 pt-4">
                <p className="text-xs text-zinc-600">
                  Equipment
                </p>

                <p className="mt-1 text-sm font-medium capitalize text-zinc-200">
                  {formatText(
                    exercise.equipment
                  )}
                </p>
              </div>

              <div className="border-t border-zinc-800 pt-4">
                <p className="text-xs text-zinc-600">
                  Difficulty
                </p>

                <span className="mt-2 inline-flex rounded-lg bg-orange-500/10 px-2.5 py-1 text-xs font-medium capitalize text-orange-500">
                  {exercise.difficulty}
                </span>
              </div>
            </div>
          </div>

          {/* INSTRUCTIONS */}

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="mb-4 text-lg font-semibold text-white">
              How to Perform
            </h2>

            <p className="text-sm leading-7 text-zinc-400">
              {exercise.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetails;