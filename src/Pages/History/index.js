import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../../store/myExpenses/selector";
import { selectMyExpenses } from "../../store/myExpenses/selector";
import BarChart1 from "../../components/BarChart";
import { Image } from "react-bootstrap";
import "./style.css";
import { useEffect } from "react";
import { fetchMyExpenses } from "../../store/myExpenses/action";
import { selectUser } from "../../store/user/selector";
import { useNavigate } from "react-router";
import testImg from "../../images/test.png";

export default function History() {
  const dispatch = useDispatch();
  const { id, token } = useSelector(selectUser);
  const navigate = useNavigate();
  const ctegory = useSelector(selectCategory);
  const expense = useSelector(selectMyExpenses);
  console.log("Expenses from history", expense);

  useEffect(() => {
    //console.log("I am from useEffect");
    //console.log("id from myExpense page", id);
    if (token === null) {
      navigate("/");
    }
    dispatch(fetchMyExpenses(id));
  }, [dispatch, id, navigate, token]);
  return (
    <div>
      {expense.length === 0 ? (
        <div>
          <Image
            src={testImg}
            style={{ width: "50%" }}
            fluid
            alt="No History image"
          />
          <h2>Please add expenses to see History</h2>
        </div>
      ) : (
        <div>
          <h1>History page</h1>
          <div className="table-container">
            <table>
              <tr>
                <th>Logo</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
              {expense.map((ex) => (
                <tr>
                  <td>
                    <img class="image" src={ex.category.logoUrl} alt="" />
                  </td>
                  <td>{ex.category.name}</td>
                  <td>{ex.amount}</td>
                  <td>{ex.date}</td>
                </tr>
              ))}
            </table>
          </div>
          <div>
            <h3> Expense history as per categories</h3>
            <div style={{ marginLeft: "20%", marginTop: "5%" }}>
              <BarChart1 />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
