import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../../store/myExpenses/selector";
import { selectMyExpenses } from "../../store/myExpenses/selector";
import BarChart1 from "../../components/BarChart";
import { Card, Form, Image, Container, Button } from "react-bootstrap";
import "./style.css";
import { useEffect } from "react";
import { fetchMyExpenses } from "../../store/myExpenses/action";
import { selectUser } from "../../store/user/selector";
import { useNavigate } from "react-router";
import testImg from "../../images/test.png";
import SearchMonth from "../../components/SearchByMonth";
import { selectSearchMonth } from "../../store/myExpenses/selector";

export default function History() {
  const dispatch = useDispatch();
  const { id, token } = useSelector(selectUser);
  const navigate = useNavigate();

  const expense = useSelector(selectMyExpenses);
  const monthExpense = useSelector(selectSearchMonth);
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
            <div>
              <Container className="mt-5 mb-5" style={{ width: "60rem" }}>
                <SearchMonth />
              </Container>
            </div>
            <div className="table-container">
              {monthExpense.length !== 0 ? (
                <>
                  <table>
                    <tr>
                      <th>Logo</th>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th> </th>
                    </tr>
                    {monthExpense.map((ex) => (
                      <tr>
                        <td>
                          <img class="image" src={ex.category.logoUrl} alt="" />
                        </td>
                        <td>{ex.category.name}</td>
                        <td>{ex.amount}</td>
                        <td>{ex.date}</td>
                        <td>
                          <Button variant="danger">delete</Button>
                        </td>
                      </tr>
                    ))}
                  </table>
                </>
              ) : (
                <>
                  <table>
                    <tr>
                      <th>Logo</th>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th> </th>
                    </tr>
                    {expense.map((ex) => (
                      <tr>
                        <td>
                          <img class="image" src={ex.category.logoUrl} alt="" />
                        </td>
                        <td>{ex.category.name}</td>
                        <td>{ex.amount}</td>
                        <td>{ex.date}</td>
                        <td>
                          <Button variant="danger">delete</Button>
                        </td>
                      </tr>
                    ))}
                  </table>
                </>
              )}
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
    </div>
  );
}
