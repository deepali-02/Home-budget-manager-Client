import { useDispatch, useSelector } from "react-redux";
import {
  Image,
  Container,
  Button,
  Dropdown,
  Row,
  DropdownButton,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import "./style.css";
import testImg from "../../images/test.png";

import { selectMyExpenses } from "../../store/myExpenses/selector";
import BarChart1 from "../../components/BarChart";
import BarChart2 from "../../components/BarChart2";
import { fetchMyExpenses } from "../../store/myExpenses/action";
import { selectUser } from "../../store/user/selector";
import SearchMonth from "../../components/SearchByMonth";
import { selectSearchMonth } from "../../store/myExpenses/selector";
import { deleteExpense } from "../../store/myExpenses/action";

export default function History() {
  const dispatch = useDispatch();
  const { id, token } = useSelector(selectUser);
  const navigate = useNavigate();

  const [mode, setMode] = useState(true);

  const expense = useSelector(selectMyExpenses);
  const monthExpense = useSelector(selectSearchMonth);

  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
    dispatch(fetchMyExpenses(id));
  }, [dispatch, id, navigate, token]);

  const onDeleteClick = (id) => {
    dispatch(deleteExpense(id));
  };

  const handleSelect = (e) => {
    setMode(e);
  };

  return (
    <div>
      <Container
        fluid
        className="mb-5"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <SearchMonth />
      </Container>

      <div>
        {expense.length === 0 && monthExpense.length === 0 ? (
          <div>
            <Image
              src={testImg}
              style={{ width: "40%" }}
              fluid
              alt="No History image"
            />
            <h1>Please add expenses to see History</h1>
          </div>
        ) : (
          <div>
            <Row className="mb-5" style={{ backgroundColor: "#E5D04A " }}>
              <h1>History of your Expenses</h1>
            </Row>
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
                          <img
                            className="image1"
                            src={ex.category.logoUrl}
                            alt=""
                          />
                        </td>
                        <td>{ex.category.name} </td>
                        <td>{ex.amount} €</td>
                        <td>{ex.date}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => onDeleteClick(ex.id)}
                          >
                            delete
                          </Button>
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
                          <img
                            class="image1"
                            src={ex.category.logoUrl}
                            alt=""
                          />
                        </td>
                        <td>{ex.category.name}</td>
                        <td>{ex.amount}</td>
                        <td>{ex.date}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => onDeleteClick(ex.id)}
                          >
                            delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </table>
                </>
              )}
            </div>
            <div>
              <Container>
                <Row style={{ backgroundColor: "#E5D04A " }}>
                  <h3> Expense history as per categories</h3>
                </Row>
                <Row className="mt-5">
                  <Dropdown>
                    <DropdownButton
                      variant="success"
                      title="Select BarChart"
                      menuVariant="dark"
                      className="mb-3"
                      onSelect={handleSelect}
                    >
                      <Dropdown.Item eventKey={true}>BarChart 1</Dropdown.Item>
                      <Dropdown.Item variant="warning" eventKey={false}>
                        BarChart 2
                      </Dropdown.Item>
                    </DropdownButton>
                  </Dropdown>
                </Row>
                <Row className="mt-5">
                  {mode === "true" ? <BarChart1 /> : <BarChart2 />}
                </Row>
              </Container>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
