import mongoose from "mongoose";
import dotenv from "dotenv";
import Exercise from "../models/exerciseModel.js";

dotenv.config();

const exercises = [
  // =====================================================
  // CHEST - 15
  // =====================================================

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
    name: "Decline Bench Press",
    muscleGroup: "chest",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Lie on a decline bench and grip the bar slightly wider than shoulder width. Lower the bar toward your lower chest and press it upward with control.",
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
      "Set the bench to a 30 to 45 degree incline. Hold dumbbells at shoulder level and press them upward. Lower them slowly.",
  },
  {
    name: "Decline Dumbbell Press",
    muscleGroup: "chest",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Lie on a decline bench with dumbbells at chest level. Press the dumbbells upward and lower them slowly toward your lower chest.",
  },
  {
    name: "Dumbbell Fly",
    muscleGroup: "chest",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Lie flat on a bench with dumbbells above your chest. Lower the weights outward with slightly bent elbows, then bring them back together.",
  },
  {
    name: "Incline Dumbbell Fly",
    muscleGroup: "chest",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Lie on an incline bench holding dumbbells above your chest. Lower the dumbbells outward in a controlled arc and bring them back together.",
  },
  {
    name: "Cable Chest Fly",
    muscleGroup: "chest",
    equipment: "cable",
    difficulty: "beginner",
    instructions:
      "Stand between cable handles. Bring your hands together in front of your chest while keeping a slight bend in your elbows.",
  },
  {
    name: "Low Cable Fly",
    muscleGroup: "chest",
    equipment: "cable",
    difficulty: "intermediate",
    instructions:
      "Set the cables low and bring the handles upward and inward toward your upper chest while maintaining controlled movement.",
  },
  {
    name: "High Cable Fly",
    muscleGroup: "chest",
    equipment: "cable",
    difficulty: "beginner",
    instructions:
      "Set the cables high and bring the handles downward and inward toward your lower chest with controlled movement.",
  },
  {
    name: "Machine Chest Press",
    muscleGroup: "chest",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Sit on the chest press machine with your back against the pad. Push the handles forward and slowly return.",
  },
  {
    name: "Machine Pec Deck",
    muscleGroup: "chest",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Sit on the pec deck machine with your arms positioned on the pads. Bring your arms together and slowly return.",
  },
  {
    name: "Push Up",
    muscleGroup: "chest",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Start in a plank position with your hands slightly wider than your shoulders. Lower your chest and push yourself back up.",
  },
  {
    name: "Diamond Push Up",
    muscleGroup: "chest",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Place your hands close together under your chest. Lower your body while keeping your core tight, then push back up.",
  },

  // =====================================================
  // BACK - 15
  // =====================================================

  {
    name: "Pull Up",
    muscleGroup: "back",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Grip the pull-up bar slightly wider than shoulder width. Pull your body upward until your chin reaches the bar, then lower with control.",
  },
  {
    name: "Chin Up",
    muscleGroup: "back",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Grip the bar with your palms facing toward you. Pull your body upward and slowly lower yourself back down.",
  },
  {
    name: "Lat Pulldown",
    muscleGroup: "back",
    equipment: "cable",
    difficulty: "beginner",
    instructions:
      "Sit at the lat pulldown machine and grip the bar. Pull it toward your upper chest and slowly return it upward.",
  },
  {
    name: "Close Grip Lat Pulldown",
    muscleGroup: "back",
    equipment: "cable",
    difficulty: "beginner",
    instructions:
      "Use a close grip attachment and pull it toward your upper chest while keeping your torso stable.",
  },
  {
    name: "Barbell Row",
    muscleGroup: "back",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Hinge forward at your hips while keeping your back neutral. Pull the bar toward your lower chest and lower it slowly.",
  },
  {
    name: "Pendlay Row",
    muscleGroup: "back",
    equipment: "barbell",
    difficulty: "advanced",
    instructions:
      "Start with the bar on the floor. Maintain a flat back and explosively pull the bar toward your lower chest before returning it to the floor.",
  },
  {
    name: "Dumbbell Row",
    muscleGroup: "back",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Place one hand on a bench for support. Pull the dumbbell toward your hip while keeping your back flat.",
  },
  {
    name: "Chest Supported Dumbbell Row",
    muscleGroup: "back",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Lie chest-down on an incline bench holding dumbbells. Pull the weights toward your ribs and lower them slowly.",
  },
  {
    name: "Seated Cable Row",
    muscleGroup: "back",
    equipment: "cable",
    difficulty: "beginner",
    instructions:
      "Sit at the cable row station. Pull the handle toward your abdomen while keeping your chest upright.",
  },
  {
    name: "Straight Arm Pulldown",
    muscleGroup: "back",
    equipment: "cable",
    difficulty: "beginner",
    instructions:
      "Stand facing the cable machine with straight arms. Pull the bar down toward your thighs while keeping your elbows slightly bent.",
  },
  {
    name: "Machine Row",
    muscleGroup: "back",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Sit on the rowing machine and pull the handles toward your body while squeezing your shoulder blades together.",
  },
  {
    name: "Reverse Grip Machine Row",
    muscleGroup: "back",
    equipment: "machine",
    difficulty: "intermediate",
    instructions:
      "Use an underhand grip on the machine handles. Pull toward your torso while keeping your chest stable.",
  },
  {
    name: "Resistance Band Row",
    muscleGroup: "back",
    equipment: "resistance_band",
    difficulty: "beginner",
    instructions:
      "Anchor the resistance band securely. Pull the handles toward your body while squeezing your shoulder blades.",
  },
  {
    name: "Superman",
    muscleGroup: "back",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Lie face down with your arms extended. Raise your arms and legs slightly from the floor, hold briefly, then lower.",
  },
  {
    name: "Bodyweight Inverted Row",
    muscleGroup: "back",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Hold a stable horizontal bar and keep your body straight. Pull your chest toward the bar and slowly lower yourself.",
  },

  // =====================================================
  // SHOULDERS - 15
  // =====================================================

  {
    name: "Dumbbell Shoulder Press",
    muscleGroup: "shoulders",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Hold dumbbells at shoulder height. Press them overhead until your arms are extended, then lower slowly.",
  },
  {
    name: "Arnold Press",
    muscleGroup: "shoulders",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Start with dumbbells at shoulder height and palms facing you. Rotate your palms outward as you press overhead.",
  },
  {
    name: "Lateral Raise",
    muscleGroup: "shoulders",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Hold dumbbells at your sides. Raise your arms outward until they are roughly parallel with the floor.",
  },
  {
    name: "Front Raise",
    muscleGroup: "shoulders",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Hold dumbbells in front of your thighs. Raise your arms forward to shoulder height and lower slowly.",
  },
  {
    name: "Rear Delt Fly",
    muscleGroup: "shoulders",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Bend forward while holding dumbbells. Raise your arms outward while squeezing your rear shoulders.",
  },
  {
    name: "Barbell Overhead Press",
    muscleGroup: "shoulders",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Hold the barbell at shoulder height. Press it overhead while keeping your core tight.",
  },
  {
    name: "Push Press",
    muscleGroup: "shoulders",
    equipment: "barbell",
    difficulty: "advanced",
    instructions:
      "Hold the bar at shoulder height. Use a slight leg drive to press the bar overhead.",
  },
  {
    name: "Cable Lateral Raise",
    muscleGroup: "shoulders",
    equipment: "cable",
    difficulty: "intermediate",
    instructions:
      "Stand beside a low cable pulley. Raise your arm outward to shoulder height and lower it slowly.",
  },
  {
    name: "Cable Front Raise",
    muscleGroup: "shoulders",
    equipment: "cable",
    difficulty: "beginner",
    instructions:
      "Hold the cable handle in front of your body. Raise your arm forward to shoulder height and lower slowly.",
  },
  {
    name: "Cable Rear Delt Fly",
    muscleGroup: "shoulders",
    equipment: "cable",
    difficulty: "intermediate",
    instructions:
      "Use two cable handles and pull them outward while keeping your arms slightly bent.",
  },
  {
    name: "Machine Shoulder Press",
    muscleGroup: "shoulders",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Sit on the shoulder press machine. Push the handles upward and slowly return.",
  },
  {
    name: "Machine Lateral Raise",
    muscleGroup: "shoulders",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Sit on the lateral raise machine. Raise your arms outward against the pads and lower slowly.",
  },
  {
    name: "Band Shoulder Press",
    muscleGroup: "shoulders",
    equipment: "resistance_band",
    difficulty: "beginner",
    instructions:
      "Stand on the resistance band and hold the handles at shoulder height. Press upward.",
  },
  {
    name: "Band Lateral Raise",
    muscleGroup: "shoulders",
    equipment: "resistance_band",
    difficulty: "beginner",
    instructions:
      "Stand on the resistance band and raise your arms outward until they reach shoulder height.",
  },
  {
    name: "Pike Push Up",
    muscleGroup: "shoulders",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Start in a downward-facing position with your hips raised. Bend your elbows and lower your head toward the floor, then push back up.",
  },

  // =====================================================
  // BICEPS - 15
  // =====================================================

  {
    name: "Dumbbell Bicep Curl",
    muscleGroup: "biceps",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Hold dumbbells at your sides with palms facing forward. Curl the weights toward your shoulders while keeping your elbows still.",
  },
  {
    name: "Hammer Curl",
    muscleGroup: "biceps",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Hold dumbbells with palms facing each other. Curl the weights toward your shoulders.",
  },
  {
    name: "Incline Dumbbell Curl",
    muscleGroup: "biceps",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Sit on an incline bench with your arms hanging down. Curl the dumbbells toward your shoulders without moving your elbows.",
  },
  {
    name: "Concentration Curl",
    muscleGroup: "biceps",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Sit with your elbow supported against your inner thigh. Curl the dumbbell toward your shoulder and lower slowly.",
  },
  {
    name: "Zottman Curl",
    muscleGroup: "biceps",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Curl the dumbbells with palms facing upward, rotate your palms downward at the top, then lower slowly.",
  },
  {
    name: "Barbell Curl",
    muscleGroup: "biceps",
    equipment: "barbell",
    difficulty: "beginner",
    instructions:
      "Hold the barbell with an underhand grip. Curl it toward your shoulders while keeping your elbows stationary.",
  },
  {
    name: "Preacher Curl",
    muscleGroup: "biceps",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Rest your arms on the preacher bench. Curl the bar upward while keeping your upper arms against the pad.",
  },
  {
    name: "Reverse Barbell Curl",
    muscleGroup: "biceps",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Hold the barbell with an overhand grip. Curl the bar upward while keeping your elbows close to your body.",
  },
  {
    name: "Cable Bicep Curl",
    muscleGroup: "biceps",
    equipment: "cable",
    difficulty: "beginner",
    instructions:
      "Hold the cable handle with an underhand grip. Curl the handle toward your shoulders and lower slowly.",
  },
  {
    name: "Cable Hammer Curl",
    muscleGroup: "biceps",
    equipment: "cable",
    difficulty: "beginner",
    instructions:
      "Use a rope attachment and keep your palms facing each other. Curl the rope toward your shoulders.",
  },
  {
    name: "Machine Bicep Curl",
    muscleGroup: "biceps",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Sit at the bicep curl machine and position your arms correctly. Curl the handles upward and lower slowly.",
  },
  {
    name: "Resistance Band Curl",
    muscleGroup: "biceps",
    equipment: "resistance_band",
    difficulty: "beginner",
    instructions:
      "Stand on the resistance band and hold the handles. Curl your hands toward your shoulders.",
  },
  {
    name: "Band Hammer Curl",
    muscleGroup: "biceps",
    equipment: "resistance_band",
    difficulty: "beginner",
    instructions:
      "Hold the resistance band handles with palms facing each other. Curl upward while keeping your elbows stable.",
  },
  {
    name: "Bodyweight Chin Hold",
    muscleGroup: "biceps",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Hold yourself at the top of a chin-up position with your chin above the bar. Maintain the position while keeping your arms engaged.",
  },
  {
    name: "Bodyweight Negative Chin Up",
    muscleGroup: "biceps",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Start at the top of a chin-up position and slowly lower your body under control.",
  },

  // =====================================================
  // TRICEPS - 15
  // =====================================================

  {
    name: "Tricep Pushdown",
    muscleGroup: "triceps",
    equipment: "cable",
    difficulty: "beginner",
    instructions:
      "Hold the cable attachment with your elbows close to your body. Push the handle downward until your arms are extended.",
  },
  {
    name: "Rope Tricep Pushdown",
    muscleGroup: "triceps",
    equipment: "cable",
    difficulty: "beginner",
    instructions:
      "Hold the rope attachment and push it downward while keeping your elbows close to your sides.",
  },
  {
    name: "Overhead Cable Extension",
    muscleGroup: "triceps",
    equipment: "cable",
    difficulty: "intermediate",
    instructions:
      "Face away from the cable machine and hold the rope overhead. Extend your arms forward while keeping your elbows stable.",
  },
  {
    name: "Cable Kickback",
    muscleGroup: "triceps",
    equipment: "cable",
    difficulty: "intermediate",
    instructions:
      "Hinge forward and hold the cable handle. Extend your arm backward while keeping your upper arm stationary.",
  },
  {
    name: "Dumbbell Overhead Tricep Extension",
    muscleGroup: "triceps",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Hold one dumbbell overhead with both hands. Lower it behind your head and extend your arms upward.",
  },
  {
    name: "Dumbbell Tricep Kickback",
    muscleGroup: "triceps",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Bend forward while holding dumbbells. Extend your arms backward and slowly return.",
  },
  {
    name: "Close Grip Bench Press",
    muscleGroup: "triceps",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Grip the bar slightly narrower than shoulder width. Lower it toward your chest and press upward while keeping your elbows controlled.",
  },
  {
    name: "Skull Crusher",
    muscleGroup: "triceps",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Lie on a bench holding the barbell above your chest. Bend your elbows to lower the bar toward your forehead, then extend your arms.",
  },
  {
    name: "Tricep Dips",
    muscleGroup: "triceps",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Support yourself on parallel bars. Lower your body by bending your elbows, then press yourself back up.",
  },
  {
    name: "Bench Dips",
    muscleGroup: "triceps",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Place your hands behind you on a bench. Lower your body by bending your elbows, then press yourself upward.",
  },
  {
    name: "Diamond Push Up",
    muscleGroup: "triceps",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Place your hands close together under your chest. Lower your body while keeping your elbows controlled and push back up.",
  },
  {
    name: "Machine Tricep Extension",
    muscleGroup: "triceps",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Sit at the tricep extension machine. Extend your arms against the resistance and return slowly.",
  },
  {
    name: "Band Tricep Extension",
    muscleGroup: "triceps",
    equipment: "resistance_band",
    difficulty: "beginner",
    instructions:
      "Anchor the resistance band securely above you. Extend your arms downward while keeping your elbows close.",
  },
  {
    name: "Band Overhead Tricep Extension",
    muscleGroup: "triceps",
    equipment: "resistance_band",
    difficulty: "beginner",
    instructions:
      "Hold the resistance band behind your head. Extend your arms upward while keeping your elbows controlled.",
  },
  {
    name: "Bodyweight Tricep Extension",
    muscleGroup: "triceps",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Place your hands on a stable elevated surface. Bend your elbows to lower your upper body and extend them to return.",
  },

  // =====================================================
  // LEGS - 15
  // =====================================================

  {
    name: "Barbell Squat",
    muscleGroup: "legs",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Place the barbell across your upper back. Bend your knees and hips to lower your body while keeping your chest up, then stand.",
  },
  {
    name: "Front Squat",
    muscleGroup: "legs",
    equipment: "barbell",
    difficulty: "advanced",
    instructions:
      "Hold the barbell across the front of your shoulders. Squat down while keeping your torso upright and drive through your feet.",
  },
  {
    name: "Romanian Deadlift",
    muscleGroup: "legs",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Hold the barbell in front of your thighs. Push your hips backward while keeping your back neutral and lower the bar.",
  },
  {
    name: "Barbell Lunge",
    muscleGroup: "legs",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions:
      "Place the barbell across your upper back. Step forward and lower your body until both knees are bent, then return.",
  },
  {
    name: "Goblet Squat",
    muscleGroup: "legs",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Hold one dumbbell close to your chest. Squat down while keeping your chest upright and return to standing.",
  },
  {
    name: "Dumbbell Lunges",
    muscleGroup: "legs",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Hold dumbbells at your sides. Step forward and lower your body, then push through your front foot to return.",
  },
  {
    name: "Dumbbell Romanian Deadlift",
    muscleGroup: "legs",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Hold dumbbells in front of your thighs. Push your hips backward while keeping your back neutral and lower the weights.",
  },
  {
    name: "Bulgarian Split Squat",
    muscleGroup: "legs",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Place one foot behind you on a bench. Lower your body toward the floor while keeping your front knee controlled.",
  },
  {
    name: "Leg Press",
    muscleGroup: "legs",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Sit on the leg press machine with your feet shoulder width apart. Lower the platform with control and press it away.",
  },
  {
    name: "Leg Extension",
    muscleGroup: "legs",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Sit on the leg extension machine. Extend your knees to raise the pad and slowly lower it.",
  },
  {
    name: "Leg Curl",
    muscleGroup: "legs",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Position yourself on the leg curl machine. Curl your heels toward your body and return slowly.",
  },
  {
    name: "Hack Squat",
    muscleGroup: "legs",
    equipment: "machine",
    difficulty: "intermediate",
    instructions:
      "Position yourself in the hack squat machine. Lower your body by bending your knees and hips, then press upward.",
  },
  {
    name: "Calf Raise",
    muscleGroup: "legs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Stand with your feet about hip width apart. Raise your heels as high as possible and lower them slowly.",
  },
  {
    name: "Dumbbell Calf Raise",
    muscleGroup: "legs",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Hold dumbbells at your sides and raise your heels from the floor. Pause at the top and lower slowly.",
  },
  {
    name: "Resistance Band Squat",
    muscleGroup: "legs",
    equipment: "resistance_band",
    difficulty: "beginner",
    instructions:
      "Place the resistance band around your thighs or hold it securely. Perform a controlled squat while keeping your knees aligned.",
  },

  // =====================================================
  // ABS - 15
  // =====================================================

  {
    name: "Crunch",
    muscleGroup: "abs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Lie on your back with your knees bent. Contract your abdominal muscles to lift your shoulders from the floor.",
  },
  {
    name: "Reverse Crunch",
    muscleGroup: "abs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Lie on your back with your knees bent. Curl your hips toward your chest and slowly return them to the floor.",
  },
  {
    name: "Leg Raise",
    muscleGroup: "abs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Lie flat on your back with your legs extended. Raise your legs upward and slowly lower them without arching your back.",
  },
  {
    name: "Hanging Leg Raise",
    muscleGroup: "abs",
    equipment: "bodyweight",
    difficulty: "advanced",
    instructions:
      "Hang from a pull-up bar. Raise your legs toward your torso while keeping the movement controlled.",
  },
  {
    name: "Plank",
    muscleGroup: "abs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Support your body on your forearms and toes. Keep your body straight and brace your core.",
  },
  {
    name: "Side Plank",
    muscleGroup: "abs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Support your body on one forearm and the side of your foot. Keep your body straight and hold the position.",
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
      "Lie on your back. Bring one knee toward your chest while rotating your opposite elbow toward it, then switch sides.",
  },
  {
    name: "Mountain Climber",
    muscleGroup: "abs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Start in a high plank. Drive one knee toward your chest, return it, and alternate legs while keeping your core tight.",
  },
  {
    name: "Weighted Crunch",
    muscleGroup: "abs",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Hold a dumbbell against your chest while performing controlled crunches. Lift your shoulders using your abdominal muscles.",
  },
  {
    name: "Dumbbell Side Bend",
    muscleGroup: "abs",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Hold a dumbbell in one hand. Bend your torso slightly toward the weight and return to an upright position.",
  },
  {
    name: "Cable Crunch",
    muscleGroup: "abs",
    equipment: "cable",
    difficulty: "intermediate",
    instructions:
      "Kneel at a cable machine holding the rope near your head. Curl your torso downward using your abdominal muscles.",
  },
  {
    name: "Pallof Press",
    muscleGroup: "abs",
    equipment: "cable",
    difficulty: "intermediate",
    instructions:
      "Stand sideways to a cable machine and hold the handle at your chest. Press it forward while resisting rotation.",
  },
  {
    name: "Machine Ab Crunch",
    muscleGroup: "abs",
    equipment: "machine",
    difficulty: "beginner",
    instructions:
      "Sit on the abdominal machine and brace your core. Curl your torso forward against the resistance and return slowly.",
  },
  {
    name: "Resistance Band Crunch",
    muscleGroup: "abs",
    equipment: "resistance_band",
    difficulty: "beginner",
    instructions:
      "Anchor the resistance band securely above you. Perform controlled crunches against the band's resistance.",
  },

  // =====================================================
  // FULL BODY - 15
  // =====================================================

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
      "Start in a high plank position. Drive one knee toward your chest, return it, and alternate legs.",
  },
  {
    name: "Jump Squat",
    muscleGroup: "full_body",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Perform a controlled squat and explosively jump upward. Land softly and immediately prepare for the next repetition.",
  },
  {
    name: "High Knees",
    muscleGroup: "full_body",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions:
      "Run in place while driving your knees upward toward your chest and maintaining an upright posture.",
  },
  {
    name: "Bear Crawl",
    muscleGroup: "full_body",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions:
      "Start on your hands and feet with your knees slightly above the floor. Move forward while keeping your core tight.",
  },
  {
    name: "Dumbbell Thruster",
    muscleGroup: "full_body",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Hold dumbbells at shoulder height. Perform a squat and press the dumbbells overhead as you stand.",
  },
  {
    name: "Dumbbell Clean and Press",
    muscleGroup: "full_body",
    equipment: "dumbbell",
    difficulty: "advanced",
    instructions:
      "Lift the dumbbells from the floor to your shoulders using your hips, then press them overhead.",
  },
  {
    name: "Dumbbell Renegade Row",
    muscleGroup: "full_body",
    equipment: "dumbbell",
    difficulty: "advanced",
    instructions:
      "Hold dumbbells in a plank position. Row one dumbbell toward your hip while keeping your body stable.",
  },
  {
    name: "Dumbbell Farmer Walk",
    muscleGroup: "full_body",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Hold heavy dumbbells at your sides and walk while keeping your posture upright and your core engaged.",
  },
  {
    name: "Kettlebell Swing",
    muscleGroup: "full_body",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions:
      "Hold the weight with both hands and hinge at your hips. Drive your hips forward to swing the weight upward.",
  },
  {
    name: "Band Squat to Press",
    muscleGroup: "full_body",
    equipment: "resistance_band",
    difficulty: "beginner",
    instructions:
      "Stand on the resistance band and hold the handles at shoulder level. Squat down and press overhead as you stand.",
  },
  {
    name: "Band Row to Squat",
    muscleGroup: "full_body",
    equipment: "resistance_band",
    difficulty: "beginner",
    instructions:
      "Hold the resistance band and perform a row followed by a controlled squat while maintaining good posture.",
  },
  {
    name: "Barbell Clean",
    muscleGroup: "full_body",
    equipment: "barbell",
    difficulty: "advanced",
    instructions:
      "Lift the barbell from the floor using your hips and legs and catch it at shoulder level with controlled technique.",
  },
  {
    name: "Machine Total Body Press",
    muscleGroup: "full_body",
    equipment: "machine",
    difficulty: "intermediate",
    instructions:
      "Use the machine according to its design and perform controlled pushing movements while maintaining stable posture.",
  },
  {
    name: "Cable Squat to Row",
    muscleGroup: "full_body",
    equipment: "cable",
    difficulty: "intermediate",
    instructions:
      "Hold the cable attachment and perform a controlled squat followed by a rowing movement as you stand.",
  },
];

// =====================================================
// SEED EXERCISES
// =====================================================

const seedExercises = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_DB_URL
    );

    console.log("MongoDB connected");

    await Exercise.deleteMany({});

    const createdExercises =
      await Exercise.insertMany(exercises);

    console.log(
      `${createdExercises.length} exercises inserted successfully`
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "Exercise seed error:",
      error
    );

    process.exit(1);
  }
};

seedExercises();