import { Col, Container, Form, Row, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addToSave } from "../../store/Goal/action";
import saveimg from "../../images/saveMoney.gif";
import { selectGoalDetails } from "../../store/Goal/selector";

export default function AddToSaving() {
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  const goal=useSelector(selectGoalDetails)
  function submitForm(e) {
    e.preventDefault();
    const saved_amount = (goal.saved_amount + parseFloat(amount))
    console.log("toatlsaved amount", saved_amount)
    dispatch(addToSave(saved_amount));
    setAmount(0);
  }
  return (
    <>
      <Container>
        <Row>
          <Col xs={6}>
            <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
              <Form.Group>
                <Form.Label>Amount € </Form.Label>
                <Form.Control
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min={1}
                  type="number"
                />
              </Form.Group>
              <Form.Group className="mt-5">
                <Button
                  style={{ backgroundColor: "#ff1493", color: "#FFFFFF" }}
                  type="submit"
                  onClick={submitForm}
                >
                  Save
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col md={{ span: 3 }} xs={6}>
            {/* <Row>
              <Col > */}
            <h3>Save more grow more</h3>
            <Image src={saveimg} fluid />
            {/* </Col>
            </Row> */}
          </Col>
        </Row>
      </Container>
    </>
  );
}
