import mongoose from "mongoose";

const workoutSetSchema = new mongoose.Schema(
  {
    setNumber: {
      type: Number,
      required: true,
      min: 1,
    },

    reps: {
      type: Number,
      required: true,
      min: 1,
    },

    weight: {
      type: Number,
      default: 0,
      min: 0,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);

const workoutExerciseSchema = new mongoose.Schema(
  {
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },

    // Planned workout
    sets: {
      type: Number,
      required: true,
      min: 1,
    },

    reps: {
      type: Number,
      required: true,
      min: 1,
    },

    weight: {
      type: Number,
      default: 0,
      min: 0,
    },

    restTime: {
      type: Number,
      default: 60,
      min: 0,
    },

    // Actual performance
    performedSets: {
      type: [workoutSetSchema],
      default: [],
    },
  },
  {
    _id: false,
  }
);

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    exercises: {
      type: [workoutExerciseSchema],
      required: true,
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "Workout must contain at least one exercise",
      },
    },

    duration: {
      type: Number,
      default: 0,
      min: 0,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;