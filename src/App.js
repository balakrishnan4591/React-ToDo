import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ToDo from "./components/todo/ToDo";

function App() {
  return (
    <>
      <div className="container">
        <div className="row">
          <ToDo />
        </div>
      </div>
    </>
  );
}

export default App;
