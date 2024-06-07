import { useEffect, useState } from "react";
import "../todo/ToDo.css";

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  const [selectedTask, setSelectedTask] = useState("All");

  const handleTask = () => {
    if (newTask.length > 1 && newDescription.length > 1) {
      let newToDoItem = {
        title: newTask,
        taskDescription: newDescription,
        status: "Not Completed",
      };

      let todoLists = [...tasks];
      todoLists.push(newToDoItem);

      setTasks(todoLists);

      localStorage.setItem("todoList", JSON.stringify(todoLists)); //convert object to a String using stringify and store it in the local storage
    } else alert("Please enter inputs");
  };

  const editTask = (index) => {
    const editItem = tasks.find((task, i) => {
      return i === index;
    });
    setCurrentEdit(index);
    setCurrentEditedItem(tasks[index]);
  };

  const deleteTask = (index) => {
    const deletedToDo = tasks.filter((_, i) => i !== index);

    localStorage.setItem("todoList", JSON.stringify(deletedToDo));
    setTasks(deletedToDo);
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, title: value };
    });
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, taskDescription: value };
    });
  };

  const handleUpdateStatus = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, status: value };
    });
    if (value === "Completed")
      document.getElementById("card-status").style.background =
        "rgb(169, 206, 124)";
    else
      document.getElementById("card-status").style.background =
        "rgb(226, 172, 131";
  };

  const handleUpdateToDo = () => {
    let newToDo = [...tasks];
    newToDo[currentEdit] = currentEditedItem;
    setTasks(newToDo);

    setCurrentEdit("");
    localStorage.setItem("todoList", JSON.stringify(newToDo));
  };

  const handleFilter = (value) => {
    setSelectedTask(() => {
      return { status: value };
    });
  };

  useEffect(() => {
    let localToDo = JSON.parse(localStorage.getItem("todoList")); //get the local storage value and convert it to an object/array
    if (localToDo) {
      setTasks(localToDo);
    }
    setSelectedTask("All");
  }, []);

  return (
    <>
      {/* Title - Start */}
      <div className="row" id="title-section">
        <h1>My Todo</h1>
      </div>
      {/* Title - End */}

      {/* Input - Start */}
      <div className="row" id="input-section">
        <div class="col">
          <input
            type="text"
            id="toDoName"
            class="form-control"
            placeholder="Todo Name"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            required
          />
        </div>
        <div class="col">
          <input
            type="text"
            id="toDoDescription"
            value={newDescription}
            class="form-control"
            placeholder="Todo Description"
            onChange={(e) => setNewDescription(e.target.value)}
            required
          />
        </div>
        <div class="col">
          <button class="btn btn-success" onClick={handleTask} id="btn_action">
            Add Todo
          </button>
        </div>
      </div>
      {/* Input - END */}

      {/* Filter -Start */}

      <div className="row" id="filter-section">
        <div className="col-md-6" id="filter-title">
          <h4>My Todos </h4>
        </div>
        <div className="col-md-6" id="filter">
          <h4>Status Filter :</h4>

          <select
            onChange={(e) => handleFilter(e.target.value)}
            id="task-filter"
          >
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
            <option value="All" selected>
              All
            </option>
          </select>
        </div>
      </div>
      {/* Filter-End */}

      {/* ToDos - Start */}
      {tasks.map((task, index) => {
        if (currentEdit === index) {
          return (
            <div className="col-md-4" key={index}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <input
                      type="text"
                      placeholder="test"
                      value={currentEditedItem.title}
                      onChange={(e) => handleUpdateTitle(e.target.value)}
                    />
                  </h5>
                  <p className="card-text">
                    <input
                      type="text"
                      placeholder="test"
                      value={currentEditedItem.taskDescription}
                      onChange={(e) => handleUpdateDescription(e.target.value)}
                    />
                    <br />
                    <label> Status: </label>
                    <select
                      onInput={(e) => handleUpdateStatus(e.target.value)}
                      id="card-status"
                    >
                      <option value={currentEditedItem.status} disabled>
                        Currently Selected: {currentEditedItem.status}
                      </option>
                      if({currentEditedItem.status} === "Completed")
                      <option value="Not Completed">Not Completed</option>
                      else
                      <option value="Completed">Completed</option>
                    </select>
                  </p>
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={handleUpdateToDo}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          );
        } else {
          //alert(selectedTask.status);
          if (
            task.status === selectedTask.status ||
            selectedTask.status === "All" ||
            selectedTask.status === undefined
          ) {
            return (
              <div className="col-md-4" key={index}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      <label>Name: {task.title} </label>
                    </h5>
                    <p className="card-text">
                      <label>Description: {task.taskDescription}</label>
                      <br />
                      <br />
                      <label>Status: </label>
                      <select>
                        <option
                          value={task.status}
                          selected
                          disabled
                          style={{ backgroundColor: "red" }}
                        >
                          {task.status}
                        </option>
                      </select>
                    </p>

                    <div className="button-container">
                      <button
                        type="button"
                        class="btn btn-success"
                        onClick={() => editTask(index)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => deleteTask(index)} //adding an arrow function helps prevent callback function being called immediately
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        }
      })}
      {/* ToDos - End */}
    </>
  );
};
export default ToDo;
