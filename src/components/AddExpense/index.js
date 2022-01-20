import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form } from "react-bootstrap";
import { getCategory } from "../../store/myExpenses/action";

export default function AddExpense() {
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [CatName, setCatName] = useState("select");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Hi fro add expense");
    dispatch(getCategory());
  }, [dispatch]);
  return (
    <>
      {/* <Card>
        <Form
          className="rounded p-4 p-sm-3"
          style={{
            width: "70%",

            marginLeft: "20%",
            boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.2)",
          }}
        >
          <Form.Group>
            <Form.Label>How much you spent? </Form.Label>
            <Form.Control
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              type="number"
              placeholder="0$"
              required
            />
          </Form.Group>
        </Form>
      </Card> */}
    </>
  );
}
