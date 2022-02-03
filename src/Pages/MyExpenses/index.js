import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, Form } from "react-bootstrap";
import { fetchMyExpenses } from "../../store/myExpenses/action";
import { selectUser } from "../../store/user/selector";
import { selectMyExpenses } from "../../store/myExpenses/selector";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import "./style.css";
//import { selectMyExpenses } from "../../store/myExpenses/selector";
import { Progress } from "../../components/Progress";
import DoughnutChart from "../../components/Doughnut";
import Button from "react-bootstrap/Button";
import AddExpense from "../../components/AddExpense";
import { useNavigate } from "react-router";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";

export default function MyExpenses() {
  const dispatch = useDispatch();
  const { id, budget } = useSelector(selectUser);
  const [mode, setMode] = useState(false);
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const myExpense = useSelector(selectMyExpenses);
  // console.log("hello expense", myExpense);
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
  const amt = myExpense.map((ex) => ex.amount);
  // console.log("hello amount", amt);
  let sum = amt.reduce((a, b) => a + b, 0);
  let balance = budget - sum;
  // console.log("Hello Sum", sum);
  // console.log("budget", budget);
  let overbudget = sum >= budget;
  return (
    <Container fluid style={{ justifyContent: "center" }}>
      <h1>Track your monthly expense!</h1>
      <Row className="mt-5" xs="auto">
        <Col md={{ span: 4, offset: 4 }}>
          <ProgressBar
            striped variant="danger"
            style={{ height: "50px", backgroundColor: "#EFF4A2" }}
            now={sum}
            label={`${sum}%`}
          />
        </Col>
        <Col>
          <Button
            size="lg"
            // className="mt-3"
            onClick={overbudget ? open : () => navigate("/addExpenses")}
          >
            Add Expenses
          </Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={{ span: 4, offset: 4 }}>
          <DoughnutChart />
        </Col>
      </Row>

      <div>
        {/* <Button className="mt-5" onClick={() => navigate("/addExpenses")}>
          Add expense
        </Button>
        <br />
        <br /> */}
        {/* <Button
          className="mt-5"
          onClick={overbudget ? open : () => navigate("/addExpenses")}
        >
          Add Expenses
        </Button>
        {console.log("show:", showDialog)} */}
        {showDialog && (
          <Dialog onDismiss={close}>
            <p>
              Over budget alert!!! After adding this expense you will be over
              budget
            </p>
            <Button onClick={() => navigate("/addExpenses")}>Okay</Button>
          </Dialog>
        )}
      </div>
    </Container>
  );
}
