import mongoose from "mongoose";
import dotenv from "dotenv";
import Exercise from "../models/exerciseModel.js";

dotenv.config();

const exercises = [
  // =========================
  // CHEST
  // =========================
  {
    name: "Bench Press",
    muscleGroup: "chest",
    equipment: "barbell",
    difficulty: "beginner",
    instructions:
      "Lie on the bench with your feet flat on the floor. Grip the bar slightly wider than shoulder width. Lower the bar toward your chest with control, then press it back up.",
  },
  {
    name: "Incline Bench Press",
    muscleGroup: "chest",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Set the bench to an incline position. Lower the bar toward your upper chest while keeping your elbows controlled, then press it upward.",
  },
  {
    name: "Dumbbell Bench Press",
    muscleGroup: "chest",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Lie flat on a bench holding a dumbbell in each hand. Lower the dumbbells toward your chest, then press them upward until your arms are extended.",
  },
  {
    name: "Incline Dumbbell Press",
    muscleGroup: "chest",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Set the bench to a 30 to 45 degree incline. Hold dumbbells at shoulder level and press them upward. Lower them slowly back to the starting position.",
  },
  {
    name: "Dumbbell Fly",
    muscleGroup: "chest",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Lie flat on a bench with dumbbells above your chest. With slightly bent elbows, lower the weights outward in a controlled arc and bring them back together.",
  },
  {
    name: "Cable Chest Fly",
    muscleGroup: "chest",
    equipment: "cable",
    difficulty: "beginner",
    instructions:
      "Stand between the cable handles. Bring your hands together in front of your chest while keeping a slight bend in your elbows. Slowly return to the starting position.",
  },
  {
    name: "Push Up",
    muscleGroup: "chest",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Start in a plank position with your hands slightly wider than your shoulders. Lower your chest toward the floor and push yourself back up while keeping your body straight.",
  },
  {
    name: "Machine Chest Press",
    muscleGroup: "chest",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Sit on the chest press machine with your back against the pad. Push the handles forward until your arms are extended, then return slowly.",
  },

  // =========================
  // BACK
  // =========================
  {
    name: "Pull Up",
    muscleGroup: "back",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Grip the pull-up bar slightly wider than shoulder width. Pull your body upward until your chin reaches the bar, then lower yourself with control.",
  },
  {
    name: "Lat Pulldown",
    muscleGroup: "back",
    equipment: "cable",
    difficulty: "beginner",
    instructions:
      "Sit at the lat pulldown machine and grip the bar slightly wider than shoulder width. Pull the bar toward your upper chest and slowly return it upward.",
  },
  {
    name: "Barbell Row",
    muscleGroup: "back",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Hold the barbell with a comfortable grip and hinge forward at your hips. Pull the bar toward your lower chest while keeping your back stable.",
  },
  {
    name: "Dumbbell Row",
    muscleGroup: "back",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Place one hand on a bench for support. Pull the dumbbell toward your hip while keeping your back flat, then lower it slowly.",
  },
  {
    name: "Seated Cable Row",
    muscleGroup: "back",
    equipment: "cable",
    difficulty: "beginner",
    instructions:
      "Sit at the cable row machine and hold the handle. Pull it toward your abdomen while keeping your chest upright, then slowly extend your arms.",
  },
  {
    name: "Machine Row",
    muscleGroup: "back",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Sit on the rowing machine with your chest against the pad. Pull the handles toward your body and squeeze your back before returning slowly.",
  },
  {
    name: "Resistance Band Row",
    muscleGroup: "back",
    equipment: "resistance_band",
    difficulty: "beginner",
    instructions:
      "Anchor the resistance band securely. Pull the handles toward your body while squeezing your shoulder blades together, then slowly release.",
  },
  {
    name: "Superman",
    muscleGroup: "back",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Lie face down with your arms extended. Raise your arms and legs slightly from the floor, hold briefly, then lower them with control.",
  },

  // =========================
  // SHOULDERS
  // =========================
  {
    name: "Dumbbell Shoulder Press",
    muscleGroup: "shoulders",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Sit or stand holding dumbbells at shoulder height. Press the dumbbells overhead until your arms are extended, then lower them slowly.",
  },
  {
    name: "Barbell Overhead Press",
    muscleGroup: "shoulders",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Hold the barbell at shoulder height. Press it overhead while keeping your core tight, then lower it back to shoulder level.",
  },
  {
    name: "Lateral Raise",
    muscleGroup: "shoulders",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Hold dumbbells at your sides. Raise your arms outward until they are roughly parallel with the floor, then lower them slowly.",
  },
  {
    name: "Front Raise",
    muscleGroup: "shoulders",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Hold dumbbells in front of your thighs. Raise one or both arms forward until they reach shoulder height, then lower them slowly.",
  },
  {
    name: "Cable Lateral Raise",
    muscleGroup: "shoulders",
    equipment: "cable",
    difficulty: "intermediate",
    instructions:
      "Stand beside a low cable pulley and hold the handle. Raise your arm outward to shoulder height, then lower it under control.",
  },
  {
    name: "Machine Shoulder Press",
    muscleGroup: "shoulders",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Sit on the shoulder press machine. Push the handles upward until your arms are extended, then lower them slowly.",
  },
  {
    name: "Band Shoulder Press",
    muscleGroup: "shoulders",
    equipment: "resistance_band",
    difficulty: "beginner",
    instructions:
      "Stand on the resistance band and hold the handles at shoulder height. Press upward until your arms are extended, then return slowly.",
  },

  // =========================
  // BICEPS
  // =========================
  {
    name: "Dumbbell Bicep Curl",
    muscleGroup: "biceps",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Hold dumbbells at your sides with palms facing forward. Curl the weights toward your shoulders while keeping your elbows close to your body.",
  },
  {
    name: "Hammer Curl",
    muscleGroup: "biceps",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Hold dumbbells with your palms facing each other. Curl the weights toward your shoulders while keeping your elbows close to your sides.",
  },
  {
    name: "Barbell Curl",
    muscleGroup: "biceps",
    equipment: "barbell",
    difficulty: "beginner",
    instructions:
      "Hold the barbell with an underhand grip. Curl the bar toward your shoulders while keeping your elbows stationary, then lower slowly.",
  },
  {
    name: "Cable Bicep Curl",
    muscleGroup: "biceps",
    equipment: "cable",
    difficulty: "beginner",
    instructions:
      "Hold the cable handle with an underhand grip. Curl the handle toward your shoulders and slowly return to the starting position.",
  },
  {
    name: "Machine Bicep Curl",
    muscleGroup: "biceps",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Sit at the bicep curl machine and place your arms correctly on the pad. Curl the handles upward and lower them slowly.",
  },
  {
    name: "Resistance Band Curl",
    muscleGroup: "biceps",
    equipment: "resistance_band",
    difficulty: "beginner",
    instructions:
      "Stand on the resistance band and hold the handles. Curl your hands toward your shoulders while keeping your elbows close to your body.",
  },

  // =========================
  // TRICEPS
  // =========================
  {
    name: "Tricep Pushdown",
    muscleGroup: "triceps",
    equipment: "cable",
    difficulty: "beginner",
    instructions:
      "Stand at the cable machine and hold the attachment. Keep your elbows close to your body and push the handle downward until your arms are extended.",
  },
  {
    name: "Dumbbell Overhead Tricep Extension",
    muscleGroup: "triceps",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Hold one dumbbell overhead with both hands. Bend your elbows to lower the weight behind your head, then extend your arms upward.",
  },
  {
    name: "Close Grip Bench Press",
    muscleGroup: "triceps",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Lie on a bench and grip the bar slightly narrower than shoulder width. Lower it toward your chest and press upward while keeping your elbows controlled.",
  },
  {
    name: "Tricep Dips",
    muscleGroup: "triceps",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Support yourself on parallel bars. Lower your body by bending your elbows, then press yourself back up to the starting position.",
  },
  {
    name: "Machine Tricep Extension",
    muscleGroup: "triceps",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Sit at the tricep extension machine. Extend your arms against the resistance and slowly return to the starting position.",
  },
  {
    name: "Band Tricep Extension",
    muscleGroup: "triceps",
    equipment: "resistance_band",
    difficulty: "beginner",
    instructions:
      "Anchor the resistance band securely above you. Extend your arms downward while keeping your elbows close to your body.",
  },

  // =========================
  // LEGS
  // =========================
  {
    name: "Barbell Squat",
    muscleGroup: "legs",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Place the barbell across your upper back. Bend your knees and hips to lower your body while keeping your chest up, then drive through your feet to stand.",
  },
  {
    name: "Goblet Squat",
    muscleGroup: "legs",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Hold one dumbbell close to your chest. Squat down while keeping your chest upright, then push through your feet to return to standing.",
  },
  {
    name: "Dumbbell Lunges",
    muscleGroup: "legs",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Hold dumbbells at your sides. Step forward and lower your body until both knees are bent, then push through the front foot to return.",
  },
  {
    name: "Leg Press",
    muscleGroup: "legs",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Sit on the leg press machine with your feet shoulder width apart. Lower the platform toward you with control, then press it away without locking your knees.",
  },
  {
    name: "Leg Extension",
    muscleGroup: "legs",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Sit on the leg extension machine and place your legs behind the pad. Extend your knees to raise the pad, then slowly lower it.",
  },
  {
    name: "Leg Curl",
    muscleGroup: "legs",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Position yourself on the leg curl machine. Curl your heels toward your body while keeping your hips stable, then return slowly.",
  },
  {
    name: "Romanian Deadlift",
    muscleGroup: "legs",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Hold the barbell in front of your thighs. Push your hips backward while keeping your back neutral and lower the bar along your legs, then drive your hips forward.",
  },
  {
    name: "Calf Raise",
    muscleGroup: "legs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Stand with your feet about hip width apart. Raise your heels as high as possible, pause briefly, then lower them slowly.",
  },
  {
    name: "Dumbbell Calf Raise",
    muscleGroup: "legs",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Hold dumbbells at your sides and raise your heels from the floor. Pause at the top and lower your heels slowly.",
  },
  {
    name: "Resistance Band Squat",
    muscleGroup: "legs",
    equipment: "resistance_band",
    difficulty: "beginner",
    instructions:
      "Place the resistance band around your thighs or hold it securely. Perform a controlled squat while keeping your knees aligned with your feet.",
  },

  // =========================
  // ABS
  // =========================
  {
    name: "Crunch",
    muscleGroup: "abs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Lie on your back with your knees bent. Contract your abdominal muscles to lift your shoulders from the floor, then slowly lower back down.",
  },
  {
    name: "Leg Raise",
    muscleGroup: "abs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Lie flat on your back with your legs extended. Raise your legs upward while keeping them controlled, then slowly lower them without arching your lower back.",
  },
  {
    name: "Plank",
    muscleGroup: "abs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Support your body on your forearms and toes. Keep your body in a straight line and brace your core while holding the position.",
  },
  {
    name: "Russian Twist",
    muscleGroup: "abs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Sit with your knees bent and lean back slightly. Rotate your torso from side to side while keeping your core engaged.",
  },
  {
    name: "Bicycle Crunch",
    muscleGroup: "abs",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Lie on your back with your hands behind your head. Bring one knee toward your chest while rotating your opposite elbow toward it, then switch sides.",
  },

  // =========================
  // FULL BODY
  // =========================
  {
    name: "Burpee",
    muscleGroup: "full_body",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "From standing, squat down and place your hands on the floor. Jump your feet back into a plank, return them forward, then jump upward.",
  },
  {
    name: "Mountain Climber",
    muscleGroup: "full_body",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Start in a high plank position. Drive one knee toward your chest, return it, and alternate legs while keeping your core tight.",
  },
  {
    name: "Dumbbell Thruster",
    muscleGroup: "full_body",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Hold dumbbells at shoulder height. Perform a squat and, as you stand, press the dumbbells overhead in one continuous movement.",
  },
  {
    name: "Kettlebell Swing",
    muscleGroup: "full_body",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Hold the weight with both hands and hinge at your hips. Drive your hips forward to swing the weight upward while keeping your back neutral.",
  },
  {
    name: "Band Squat to Press",
    muscleGroup: "full_body",
    equipment: "resistance_band",
    difficulty: "beginner",
    instructions:
      "Stand on the resistance band and hold the handles at shoulder level. Perform a squat and press the handles overhead as you stand.",
  },
];

const seedExercises = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);

    console.log("MongoDB connected");

    await Exercise.deleteMany({});

    const createdExercises = await Exercise.insertMany(exercises);

    console.log(
      `${createdExercises.length} exercises inserted successfully`
    );

    process.exit(0);
  } catch (error) {
    console.error("Exercise seed error:", error);
    process.exit(1);
  }
};

seedExercises();