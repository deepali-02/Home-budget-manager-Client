import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { getCategory } from "../../store/myExpenses/action";
import { selectCategory } from "../../store/myExpenses/selector";
import { newExpense } from "../../store/myExpenses/action";
import { useNavigate } from "react-router";
import img from "../../images/giphy.gif";
import { selectUser } from "../../store/user/selector";

export default function AddExpense() {
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(moment());
  const [categoryId, setCategoryId] = useState();
  const dispatch = useDispatch();
  const categoty = useSelector(selectCategory);
  const navigate = useNavigate();
  const { token } = useSelector(selectUser);

  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
    dispatch(getCategory());
  }, [dispatch, token, navigate]);

  function submitForm(e) {
    e.preventDefault();
    // console.log("amount,date,categoryId", amount, date, categoryId);
    if (!categoryId) return;
    dispatch(newExpense(amount, date, categoryId));
    setAmount(0);
    setDate("");
    setCategoryId("");
    navigate("/my_expenses");
  }

  return (
    <>
      <Container fluid>
        <Row xs="auto">
          <Col md={{ span: 4, offset: 3 }}>
            <Form
              onSubmit={submitForm}
              className="rounded p-4 p-sm-3 mt-5"
              style={{
                // width: "100%",
                alignItems: "center",
                // marginLeft: "20%",
                boxShadow: "2px 2px 2px 2px rgba(0.2,0.2,0.2,0.2)",
              }}
            >
              <Form.Group className="mt-5">
                <Form.Label>How much you spent? </Form.Label>
                <Form.Control
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  type="number"
                  min="0"
                  required
                />
              </Form.Group>
              <Form.Group className="mt-5">
                <Form.Label>Select Category</Form.Label>
                <Form.Select
                  onChange={(event) => setCategoryId(event.target.value)}
                  // isInvalid
                  required
                  // id="enabledSelect"
                >
                  <option value="" disabled selected>
                    Please select the category
                  </option>
                  {categoty.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mt-5">
                <Form.Label>Date</Form.Label>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    maxDate={moment()}
                    margin="normal"
                    id="date-picker-dialog"
                    format="DD/MM/YYYY"
                    value={date}
                    onChange={(selectedDate) => {
                      console.log("the selectedDate", selectedDate);
                      setDate(selectedDate);
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Form.Group>
              <Form.Group>
                <Button className="mt-5" type="submit">
                  Add
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col md="auto" className="mt-3">
            <Image src={img} alt="" />
          </Col>
        </Row>
      </Container>
    </>
  );
}
