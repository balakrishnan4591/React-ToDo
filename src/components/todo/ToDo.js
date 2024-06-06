// import { todos } from "./data";
// import Input from "../input/Input";

import { useEffect, useState } from "react";

const ToDo = () => {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  // const[]
  const [completedToDos, setCompletedToDos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  function handleNameChange(event) {
    setNewTask(event.target.value);
  }

  function handleDescriptionChange(event) {
    setNewDescription(event.target.value);
  }

  const handleTask = () => {
    if (newTask.length > 1 && newDescription.length > 1) {
      let buttonVal = document.getElementById("btn_action").innerHTML;
      // if (buttonVal === "Add Todo") {
      let newToDoItem = { title: newTask, taskDescription: newDescription };

      let todoLists = [...tasks];
      todoLists.push(newToDoItem);

      setTasks(todoLists);
      localStorage.setItem("todoList", JSON.stringify(todoLists)); //convert object to a String using stringify and store it in the local storage
      // }
      // if (buttonVal === "Update ToDo") {
      // }
    } else alert("Please enter inputs");
  };

  const editTask = (index) => {
    const editItem = tasks.find((task, i) => {
      return i === index;
    });
    setCurrentEdit(index);
    setCurrentEditedItem(tasks[index]);

    console.log(editItem);
    //prompt(editItem.title);
    document.getElementById("toDoName").value = editItem.title;
    document.getElementById("toDoDescription").value = editItem.taskDescription;
    // document.getElementById("btn_action").innerHTML = "Update ToDo";
  };

  const deleteTask = (index) => {
    const deletedToDo = tasks.filter((_, i) => i !== index);
    // setTasks(updatedTasks);
    // let deletedToDo = [...tasks];
    // deletedToDo.splice(index);

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

  const handleUpdateToDo = () => {
    let newToDo = [...tasks];
    newToDo[currentEdit] = currentEditedItem;
    setTasks(newToDo);
    setCurrentEdit("");
    localStorage.setItem("todoList", JSON.stringify(newToDo));
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;

    alert(completedOn);
    let filteredItem = { ...tasks[index], completedOn: completedOn };

    let updatedCompleted = [...completedToDos];
    updatedCompleted.push(filteredItem);
    setCompletedToDos(updatedCompleted);
  };

  useEffect(() => {
    let localToDo = JSON.parse(localStorage.getItem("todoList")); //get the local storage value and convert it to an object/array
    if (localToDo) {
      setTasks(localToDo);
    }
  }, []);

  return (
    <>
      <div className="row" id="title">
        <h1>My Todo</h1>
      </div>
      {/* <form id="inputContainer"> */}
      <div className="row">
        <div className="col-md-4">
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
            <button
              class="btn btn-success"
              onClick={handleTask}
              id="btn_action"
            >
              Add Todo
            </button>
          </div>
        </div>
      </div>
      {/* </form> */}

      {/* filter start */}

      <div className="col-md-6">
        <h3>My ToDos</h3>
      </div>
      <div className="col-md-6">
        <select>
          <option
            value="completed"
            className={`isCompleteScreen ${
              isCompleteScreen === false && "active"
            }`}
            onSelect={() => setIsCompleteScreen(false)}
          >
            Completed
          </option>
          <option
            value="notCompleted"
            className={`isCompleteScreen ${
              isCompleteScreen === true && "active"
            }`}
            onSelect={() => setIsCompleteScreen(true)}
          >
            Not Completed
          </option>
          <option value="all" selected>
            All
          </option>
        </select>
      </div>

      {/* filter end */}

      {tasks.map((task, index) => {
        if (currentEdit === index) {
          return (
            // <div key={index}>
            //   <input
            //     type="text"
            //     placeholder="test"
            //     value={currentEditedItem.title}
            //     onChange={(e) => handleUpdateTitle(e.target.value)}
            //   />
            // </div>

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
                    <select>
                      <option value="completed">Completed</option>
                      <option value="notCompleted" selected>
                        Not Completed
                      </option>
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
                    <label> Status: </label>
                    <select>
                      <option value="completed">Completed</option>
                      <option value="notCompleted" selected>
                        Not Completed
                      </option>
                    </select>
                  </p>
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={() => handleComplete(index)}
                  >
                    Completed
                  </button>
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
          );
        }
      })}
    </>
  );
};
export default ToDo;
