import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router";
import { fetchMyExpenses } from "../../store/myExpenses/action";
import { selectUser } from "../../store/user/selector";

export default function MyExpenses() {
  const dispatch = useDispatch();
  const { id } = useSelector(selectUser);

  useEffect(() => {
    console.log("I am from useEffect");
    console.log("id from myExpense page", id);
    dispatch(fetchMyExpenses(id));
  }, [dispatch, id]);

  return (
    <div>
      <h1>Track your monthly expense!</h1>
    </div>
  );
}
