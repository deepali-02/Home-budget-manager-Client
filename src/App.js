import "./App.css";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/Navigation/NavBar";
import HomePage from "./Pages/HomePage";
import MyExpenses from "./Pages/MyExpenses";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWithStoredToken } from "./store/user/action";
import AddExpense from "./components/AddExpense";
import History from "./Pages/History";
import bg from "./images/bgimg.jpg";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);
  return (
    <div
      className="App"
      // style={{
      //   backgroundImage: "url(" + bg + ")",
      //   backgroundSize: "cover",
      //   height: "100vh",
      //   width: "100%",
      // }}
    >
      <NavBar />
      <br />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/my_expenses" element={<MyExpenses />} />
        <Route path="/addExpenses" element={<AddExpense />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
