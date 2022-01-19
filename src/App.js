import "./App.css";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/Navigation/NavBar";
import HomePage from "./Pages/HomePage";
import MyExpenses from "./Pages/MyExpenses";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  return (
    <div className="App">
      <NavBar />
      <br />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/my_expenses" element={<MyExpenses />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
