import "./Filter.css";

function Filter() {
  return (
    <>
      <div className="col-md-6">
        <h3>My ToDos</h3>
      </div>
      <div className="col-md-6">
        <select>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
          <option value="all" selected>
            All
          </option>
        </select>
      </div>
    </>
  );
}

export default Filter;
