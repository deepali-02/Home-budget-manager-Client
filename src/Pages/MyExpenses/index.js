import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Form } from "react-bootstrap";
import { fetchMyExpenses } from "../../store/myExpenses/action";
import { selectUser } from "../../store/user/selector";
import AddExpense from "../../components/AddExpense";
import "./style.css"
//import { selectMyExpenses } from "../../store/myExpenses/selector";
import { Progress } from "../../components/Progress";
import Dount from "../../components/Dount";
import Button from "react-bootstrap/Button";

export default function MyExpenses() {
  const dispatch = useDispatch();
  const { id, budget } = useSelector(selectUser);
  //const myExpense = useSelector(selectMyExpenses);

  useEffect(() => {
    console.log("I am from useEffect");
    console.log("id from myExpense page", id);
    dispatch(fetchMyExpenses(id));
  }, [dispatch, id]);

  return (
    <>
    <h1>Track your monthly expense!</h1>
      <div className="dountChart">
      <Dount />
      </div>

      <div>
        <Button className="mt-5" onClick={<AddExpense/>}>
          Add expense
        </Button>
      </div>
    </>
  );
}
