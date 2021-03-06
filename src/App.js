import "./App.css";
import { Routes, Route } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import NavBar from "./components/Navigation/NavBar";
import HomePage from "./Pages/HomePage";
import MyExpenses from "./Pages/MyExpenses";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import MessageBox from "./components/MessageBox";
import { getUserWithStoredToken } from "./store/user/action";
import AddExpense from "./components/AddExpense";
import History from "./Pages/History";
import DetailSavings from "./Pages/DetailSavingPage";
import AboutMe from "./Pages/AboutMe";
import Saving from "./Pages/Saving";
import AddSavingsGoal from "./components/AddSavingsGoal";
import AddToSaving from "./components/AddToSaving";
import BarChart1 from "./components/BarChart";
import BarChart2 from "./components/BarChart2";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);
  return (
    <div className="App">
      <NavBar />
      <MessageBox />
      <br />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/my_expenses" element={<MyExpenses />} />
        <Route path="/addExpenses" element={<AddExpense />} />
        <Route path="/history" element={<History />} />
        <Route path="/savings" element={<Saving />} />
        <Route path="/detail_savings/:id" element={<DetailSavings />} />
        <Route path="/addSavingsGoal" element={<AddSavingsGoal />} />
        <Route path="/addToSaving" element={<AddToSaving />} />
        <Route path="/barchart1" element={<BarChart1 />} />
        <Route path="/barchart2" element={<BarChart2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
