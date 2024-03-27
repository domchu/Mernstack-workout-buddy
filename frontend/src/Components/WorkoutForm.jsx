import { useState } from "react";
import useWorkoutsContext from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyField, setEmptyField] = useState([]);

  // HANDLESUBMIT BUTTON
  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    const response = await fetch("http://localhost:4000/api/workouts/", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    // console.log(json);
    // console.log(response);
    if (!response.ok) {
      setError(json.error);
      setEmptyField(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyField([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      // console.log("new workout added", json);
      // console.log(json);
    }
  };

  return (
    <>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>

        <label>Exercise Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyField.includes("title") ? "error" : ""}
        />

        <label>Load (in Kg):</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyField.includes("load") ? "error" : ""}
        />

        <label>Reps:</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyField.includes("reps") ? "error" : ""}
        />
        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default WorkoutForm;