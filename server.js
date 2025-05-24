const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/fitness", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const workoutSchema = new mongoose.Schema({
  exercise: String,
  duration: Number,
  goal: String,
});
const Workout = mongoose.model("Workout", workoutSchema);

app.get("/workouts", async (req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

app.post("/workouts", async (req, res) => {
  const { exercise, duration, goal } = req.body;
  const newWorkout = new Workout({ exercise, duration, goal });
  await newWorkout.save();
  res.json(newWorkout);
});

app.listen(5000, () => console.log("Server running on port 5000"));
