import "./Input.css";
import { todos } from "../todo/data";
import { useState, useEffect } from "react";
import ToDo from "../todo/ToDo";
// import DataContext from "./components/context/Context";

function Input() {
  const [tasks, setTasks] = useState(["eat", "walk"]);
  const [newTask, setNewTasks] = useState([]);

  function handleInputChange(event) {
    setNewTasks(event.target.value);
  }

  function addTask() {
    setTasks((t) => [...t, newTask]);
  }

  const [items, setItems] = useState("0", "Go to Gym", "hit gym");

  return (
    <>
      {/* <ToDo tasks={tasks} /> */}
      <div className="row" id="title">
        <h1>My Todo</h1>
      </div>
      <form id="inputContainer">
        <div class="row">
          <div class="col">
            <input
              type="text"
              id="toDoName"
              class="form-control"
              placeholder="Todo Name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div class="col">
            <input
              type="text"
              id="toDoDescription"
              class="form-control"
              placeholder="Todo Description"
              required
            />
          </div>
          <div class="col">
            <button type="submit" class="btn btn-success" onClick={addTask}>
              Add Todo
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Input;
