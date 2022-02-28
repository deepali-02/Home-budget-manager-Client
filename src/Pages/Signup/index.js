import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import signupImg from "../../images/signup.jpg";
import { useNavigate } from "react-router";
import {
  Form,
  Button,
  Col,
  Row,
  Image,
  Container,

} from "react-bootstrap";
import { Link } from "react-router-dom";
import { signUp } from "../../store/user/action";
import { selectToken } from "../../store/user/selector";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState(0);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

  function submitForm(event) {
    event.preventDefault();

    dispatch(signUp(name, email, password, budget));

    setName("");
    setEmail("");
    setPassword("");
    setBudget(0);
  }

  return (
    <Container>
      <Row>
        <Col className="mt-5">
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                checked={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Enter name"
                required
              />
            </Form.Group>
            <Form.Group className="mt-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Enter email"
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Set Budget</Form.Label>
              <Form.Control
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                type="number"
                min="1"
                placeholder="Set your monthly budget here e.g. 500"
                required
              />
            </Form.Group>
            <Form.Group className="mt-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>
            <Form.Group className="mt-5">
              <Button variant="primary" type="submit" onClick={submitForm}>
                Sign up
              </Button>
            </Form.Group>
            <p className="mt-4">
              Already having account?
              <Link to="/login">Click here to login</Link>
            </p>
          </Form>
        </Col>
        <Col sm className="mt-3">
          <div className="color-overlay d-flex justify content center align-items-center">
            {/* <Card style={{ width: "80%", marginRight: "20%", marginLeft: "20%" }}> */}
            <Image src={signupImg} fluid style={{ border: "none" }} />
            {/* </Card> */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
