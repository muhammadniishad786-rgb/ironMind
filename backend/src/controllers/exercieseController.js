import Exercise from "../models/exerciseModel.js";


// Create exercise
export const createExercise = async (req, res) => {
  try {
    const {
      name,
      muscleGroup,
      equipment,
      difficulty,
      instructions,
      image,
      videoUrl,
      videoThumbnail
    } = req.body;

    if (
      !name ||
      !muscleGroup ||
      !equipment ||
      !difficulty ||
      !instructions
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const exercise = await Exercise.create({
      name,
      muscleGroup,
      equipment,
      difficulty,
      instructions,
      image,
      videoUrl,
      videoThumbnail
    });

    res.status(201).json({
      message: "Exercise created successfully",
      exercise,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create exercise",
      error: error.message,
    });
  }
};

// Get all exercises
export const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find().sort({ createdAt: -1 });

    res.status(200).json({
      exercises,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get exercises",
      error: error.message,
    });
  }
};

// Get single exercise
export const getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      return res.status(404).json({
        message: "Exercise not found",
      });
    }

    res.status(200).json({
      exercise,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get exercise",
      error: error.message,
    });
  }
};

// Update exercise
export const updateExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!exercise) {
      return res.status(404).json({
        message: "Exercise not found",
      });
    }

    res.status(200).json({
      message: "Exercise updated successfully",
      exercise,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update exercise",
      error: error.message,
    });
  }
};

// Delete exercise
export const deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);

    if (!exercise) {
      return res.status(404).json({
        message: "Exercise not found",
      });
    }

    res.status(200).json({
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete exercise",
      error: error.message,
    });
  }
};