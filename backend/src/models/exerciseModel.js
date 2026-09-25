import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    muscleGroup: {
      type: String,
      required: true,
      enum: [
        "chest",
        "back",
        "shoulders",
        "biceps",
        "triceps",
        "legs",
        "abs",
        "full_body",
      ],
    },

    equipment: {
      type: String,
      required: true,
      enum: [
        "bodyweight",
        "dumbbell",
        "barbell",
        "machine",
        "cable",
        "resistance_band",
      ],
    },

    difficulty: {
      type: String,
      required: true,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    instructions: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      default: "",
    },

    videoThumbnail: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;
