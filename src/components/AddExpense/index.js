import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form } from "react-bootstrap";
import { getCategory } from "../../store/myExpenses/action";
import { selectCategory } from "../../store/myExpenses/selector";
import Button from "@restart/ui/esm/Button";

export default function AddExpense() {
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [CatName, setCatName] = useState("select");
  const dispatch = useDispatch();
  const Categoty = useSelector(selectCategory);
  console.log("Category", Categoty);

  useEffect(() => {
    console.log("Hi fro add expense");
    dispatch(getCategory());
  }, [dispatch]);
  return (
    <>
      <Card>
        <Form
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
              placeholder
              required
            />
          </Form.Group>
          <Form.Group className="mt-5">
            <Form.Label>Select Category</Form.Label>
            <Form.Select id="enabledSelect">
              {Categoty.map((c) => (
                <option> {c.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mt-5">
            <Form.Label>Date </Form.Label>
            <Form.Control
              value={date}
              onChange={(event) => setDate(event.target.value)}
              type="date"
              placeholder
              required
            />
          </Form.Group>
          <Form.Group>
            <Button className="mt-5">Add</Button>
          </Form.Group>
        </Form>
      </Card>
    </>
  );
}
