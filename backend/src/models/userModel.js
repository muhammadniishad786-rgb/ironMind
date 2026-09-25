import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      min: 13,
      max: 100,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    height: {
      type: Number,
    },

    weight: {
      type: Number,
    },

    goal: {
      type: String,
      enum: [
        "muscle_gain",
        "weight_loss",
        "strength",
        "general_fitness",
      ],
      default: "general_fitness",
    },

    experience: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    trainingDays: {
      type: Number,
      min: 1,
      max: 7,
      default: 3,
    },

    equipment: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;