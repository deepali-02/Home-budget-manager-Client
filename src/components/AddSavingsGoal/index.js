import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { newGoal } from "../../store/Goal/action";

export default function AddSavingsGoal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [date, setDate] = useState("");

  function submitForm(e) {
    e.preventDefault();
    dispatch(newGoal(goalName, targetAmount, date));
    navigate("/savings");
  }

  return (
    <Container>
      <Row className="mb-5">
        <Col className="mb-5 mt-3" md={{ span: 6, offset: 3 }}>
          <Form
            className="mt-5"
            onSubmit={submitForm}
            style={{ boxShadow: "2px 2px 2px 2px rgba(0.2,0.2,0.2,0.2)" }}
          >
            <Form.Group className="mt-5">
              <Form.Label>Save For </Form.Label>
              <Form.Control
                value={goalName}
                onChange={(event) => setGoalName(event.target.value)}
                type="text"
                maxLength={20}
                required
              />
            </Form.Group>
            <Form.Group className="mt-5">
              <Form.Label>Target amount </Form.Label>
              <Form.Control
                value={targetAmount}
                onChange={(event) => setTargetAmount(event.target.value)}
                type="nuber"
                min="1"
                required
              />
            </Form.Group>
            <Form.Group className="mt-5">
              <Form.Label>Desire Date </Form.Label>
              <Form.Control
                value={date}
                onChange={(event) => setDate(event.target.value)}
                type="date"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </Form.Group>
            <Form.Group className="mb-5">
              <Button className="mb-5 mt-3" type="submit">
                Set Goal
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
