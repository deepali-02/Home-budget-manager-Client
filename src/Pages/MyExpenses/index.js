import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Form } from "react-bootstrap";
import { fetchMyExpenses } from "../../store/myExpenses/action";
import { selectUser } from "../../store/user/selector";

import "./style.css";
//import { selectMyExpenses } from "../../store/myExpenses/selector";
import { Progress } from "../../components/Progress";
import Dount from "../../components/Dount";
import Button from "react-bootstrap/Button";
import AddExpense from "../../components/AddExpense";

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
  return (
    <>
      <h1>Track your monthly expense!</h1>
      <div className="dountChart">
        <Dount />
      </div>

      <div>
        <Button className="mt-5" onClick={() => setMode(!mode)}>
          Add expense
        </Button>
        {mode && <AddExpense />}
      </div>
    </>
  );
}
