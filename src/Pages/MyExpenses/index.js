import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, Form } from "react-bootstrap";
import { fetchMyExpenses } from "../../store/myExpenses/action";
import { selectUser } from "../../store/user/selector";

import "./style.css";
//import { selectMyExpenses } from "../../store/myExpenses/selector";
import { Progress } from "../../components/Progress";
import DoughnutChart from "../../components/Doughnut";
import Button from "react-bootstrap/Button";
import AddExpense from "../../components/AddExpense";
import { useNavigate } from "react-router";
import { Container } from "@material-ui/core";
export default function MyExpenses() {
  const dispatch = useDispatch();
  const { id, budget } = useSelector(selectUser);
  const [mode, setMode] = useState(false);
  //const myExpense = useSelector(selectMyExpenses);

  useEffect(() => {
    console.log("I am from useEffect");
    console.log("id from myExpense page", id);
    dispatch(fetchMyExpenses(id));
  }, [dispatch, id]);

  // const form = () => {
  //   console.log("I am in function");
  //   <AddExpense />;
  // };

  const navigate = useNavigate();
  return (
    <Container fluid style={{ width: "40rem", justifyContent: "center" }}>
      <h1>Track your monthly expense!</h1>

      <DoughnutChart />

      <div>
        <Button className="mt-5" onClick={() => navigate("/addExpenses")}>
          Add expense
        </Button>
      </div>
    </Container>
  );
}
