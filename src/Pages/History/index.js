import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../../store/myExpenses/selector";
import { selectMyExpenses } from "../../store/myExpenses/selector";
import BarChart1 from "../../components/BarChart";
import "./style.css";

export default function History() {
  const dispatch = useDispatch();
  const ctegory = useSelector(selectCategory);
  const expense = useSelector(selectMyExpenses);
  return (
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
        <BarChart1 />
      </div>
    </div>
  );
}
