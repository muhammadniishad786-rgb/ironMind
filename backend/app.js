import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// mongo DB connection
connectDB()

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
  res.json({
    message: "Gym Tracker API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});