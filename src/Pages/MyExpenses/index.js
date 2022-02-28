import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { fetchMyExpenses } from "../../store/myExpenses/action";
import { selectUser } from "../../store/user/selector";
import { selectMyExpenses } from "../../store/myExpenses/selector";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import "./style.css";
//import { selectMyExpenses } from "../../store/myExpenses/selector";

import DoughnutChart from "../../components/Doughnut";
import Button from "react-bootstrap/Button";

import { selectSearchMonth } from "../../store/myExpenses/selector";
import { useNavigate } from "react-router";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";

export default function MyExpenses() {
  const dispatch = useDispatch();
  const { id, budget } = useSelector(selectUser);

  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const myExpense = useSelector(selectMyExpenses);
  const monthExpense = useSelector(selectSearchMonth);
  console.log("hello expense", myExpense);
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
  let amt;
  if (monthExpense.length !== 0) {
    amt = monthExpense.map((ex) => ex.amount);
  } else {
    amt = myExpense.map((ex) => ex.amount);
  }

  // console.log("hello amount", amt);
  let sum = amt.reduce((a, b) => a + b, 0);
  // let balance = budget - sum;
  // console.log("Hello Sum", sum);
  // console.log("budget", budget);
  let overbudget = sum >= budget;
  return (
    <Container fluid>
      <Row style={{ backgroundColor: "#E5D04A " }}>
        <h1>Track your monthly expense!</h1>
      </Row>
      <Row className="mt-5">
        <Col sm md={{ span: 4, offset: 3 }} className="mt-3">
          <ProgressBar
            striped
            animated
            variant="danger"
            max={budget}
            style={{ height: "50px", backgroundColor: "#BFF4A2" }}
            now={sum}
            label={`${Math.round((sum / budget) * 100)}%`}
          />
        </Col>
        <Col sm md="auto" className="mt-3">
          <Button
            size="lg"
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
