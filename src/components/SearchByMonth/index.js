import { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { BUTTON_COLOR } from "../../config/constants";

import { expenseByMonth } from "../../store/myExpenses/action";

export default function SearchMonth() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  console.log(`date= ${currentDate}, month= ${currentMonth}`);
  const [month, setMonth] = useState("");
  const dispatch = useDispatch();
  function submitForm(e) {
    e.preventDefault();
    console.log("sent month=", month);
    dispatch(expenseByMonth(month));
  }

  const monthArray = [
    { num: "01", name: "January" },
    { num: "02", name: "Februar" },
    { num: "03", name: "March" },
    { num: "04", name: "April" },
    { num: "05", name: "May" },
    { num: "06", name: "June" },
    { num: "07", name: "July" },
    { num: "08", name: "August" },
    { num: "09", name: "September" },
    { num: "10", name: "October" },
    { num: "11", name: "November" },
    { num: "12", name: "December" },
  ];

  return (
    <div>
      <Card style={{ border: "none", background: "none" }}>
        <Form onSubmit={submitForm}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Select onChange={(event) => setMonth(event.target.value)}>
                  <option value="">Select month</option>
                  {monthArray.map((m) => {
                    return (
                      <>
                        {m.num <= currentMonth ? (
                          <>
                            <option value={m.num}>{m.name}</option>
                          </>
                        ) : (
                          <>
                            <option disabled={m.num}>{m.name}</option>
                          </>
                        )}
                      </>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Button
                  type="submit"
                  style={{ backgroundColor: `${BUTTON_COLOR}` }}
                >
                  Search
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}
