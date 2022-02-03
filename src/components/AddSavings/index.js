import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { newGoal } from "../../store/Goal/action";
import { useDispatch } from "react-redux";

export default function AddSavings() {
  const dispatch = useDispatch();

  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [date, setDate] = useState("");

  function submitForm(e) {
    e.preventDefault();
    dispatch(newGoal(goalName, targetAmount, date));
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={submitForm}>
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
            <Form.Group>
              <Button className="mt-5" type="submit">
                Set Goal
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
