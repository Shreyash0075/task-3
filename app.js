import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [goal, setGoal] = useState("Lose Weight");

  useEffect(() => {
    axios
      .get("http://localhost:5000/workouts")
      .then((res) => setWorkouts(res.data));
  }, []);

  const addWorkout = () => {
    axios
      .post("http://localhost:5000/workouts", { exercise, duration, goal })
      .then((res) => {
        setWorkouts([...workouts, res.data]);
        setExercise("");
        setDuration("");
      });
  };

  const data = {
    labels: workouts.map((w, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: "Workout Duration",
        data: workouts.map((w) => w.duration),
        borderColor: "blue",
      },
    ],
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Fitness Tracking App</h1>
      <input
        type="text"
        placeholder="Exercise"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
      />
      <input
        type="number"
        placeholder="Duration (min)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <select value={goal} onChange={(e) => setGoal(e.target.value)}>
        <option value="Lose Weight">Lose Weight</option>
        <option value="Build Muscle">Build Muscle</option>
        <option value="Improve Stamina">Improve Stamina</option>
      </select>
      <button onClick={addWorkout}>Add Workout</button>
      <h2>Progress Chart</h2>
      <Line data={data} />
      <ul>
        {workouts.map((w, i) => (
          <li key={i}>
            {w.exercise} - {w.duration} min ({w.goal})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
