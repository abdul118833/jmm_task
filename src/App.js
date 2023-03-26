import "./App.css";
import Login from "./screens/login";
import {Route, Routes } from "react-router-dom";
import Employees from "./screens/Employees";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/employee" element={<Employees/>}/>
      </Routes>
    </div>
  );
}

export default App;
