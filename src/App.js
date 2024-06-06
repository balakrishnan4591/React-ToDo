import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Input from "./components/input/Input";
// import Filter from "./components/filter/Filter";
import ToDo from "./components/todo/ToDo";

function App() {
  return (
    <>
      <div className="container">
        {/* <div className="row">
          <Input />
        </div> */}
        {/* <div className="row">
          <Filter />
        </div> */}
        <div className="row">
          <ToDo />
        </div>
      </div>
    </>
  );
}

export default App;
