import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Button } from "react-bootstrap";
import moment from "moment";
import { getCategory } from "../../store/myExpenses/action";
import { selectCategory } from "../../store/myExpenses/selector";
import { newExpense } from "../../store/myExpenses/action";
import { Navigate, useNavigate } from "react-router";
export default function AddExpense() {
  const [amount, setAmount] = useState(0);
  //const currentDate = moment(new Date()).format("YYYY/MM/DD");
  const [date, setDate] = useState("");
  //console.log("Current date", currentDate);
  const [categoryId, setCategoryId] = useState();
  const dispatch = useDispatch();
  const categoty = useSelector(selectCategory);
  //console.log("Category Id", categoryId);
  const navigate = useNavigate();
  useEffect(() => {
    //console.log("Hi fro add expense");
    dispatch(getCategory());
  }, [dispatch]);

  function submitForm(e) {
    e.preventDefault();
    // console.log("On click add button");
    // console.log("amount,date,categoryId", amount, date, categoryId);
    dispatch(newExpense(amount, date, categoryId));
    setAmount(0);
    setDate("");
    setCategoryId("");
    navigate("/my_expenses");
  }

  return (
    <>
      <Card>
        <Form
          onSubmit={submitForm}
          className="rounded p-4 p-sm-3 mt-5"
          style={{
            width: "50%",
            alignItems: "center",
            marginLeft: "20%",
            boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.2)",
          }}
        >
          <Form.Group className="mt-5">
            <Form.Label>How much you spent? </Form.Label>
            <Form.Control
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              type="number"
              required
            />
          </Form.Group>
          <Form.Group className="mt-5">
            <Form.Label>Select Category</Form.Label>
            <Form.Select
              onChange={(event) => setCategoryId(event.target.value)}
              id="enabledSelect"
            >
              <option disabled selected>
                Please select the category
              </option>
              {categoty.map((c) => (
                <option value={c.id}> {c.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-5">
            <Form.Label>Date </Form.Label>
            <Form.Control
              value={date}
              onChange={(event) => setDate(event.target.value)}
              type="date"
              required
            />
          </Form.Group>
          <Form.Group>
            <Button className="mt-5" type="submit">
              Add
            </Button>
          </Form.Group>
        </Form>
      </Card>
    </>
  );
}
