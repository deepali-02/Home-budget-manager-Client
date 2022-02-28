import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col, Row, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import loginImg from "../../images/login.jpg";
import { login } from "../../store/user/action";
import { selectToken } from "../../store/user/selector";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== null) {
      navigate("/my_expenses");
    }
  }, [token, navigate]);

  function submitForm(event) {
    console.log("hi");
    event.preventDefault();

    dispatch(login(email, password));

    setEmail("");
    setPassword("");
  }
  return (
    <Container>
      <Row>
        <Col className="mt-5">
          <Form
            className="mt-5"
            // style={{
            //   width: "80%",
            //   marginTop: "10%",
            //   marginLeft: "10%",
            // boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.2)",
            // }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
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
              <Button
                classname="mb-5"
                variant="primary"
                type="submit"
                onClick={submitForm}
              >
                Log in
              </Button>
            </Form.Group>
            <Form.Group className="mt-5">
              Not having account?
              <Link
                to="/signup"
                style={{ textAlign: "center", paddingLeft: "2%" }}
              >
                Click here to signup
              </Link>
            </Form.Group>
          </Form>
        </Col>
        <Col sm>
          {/* <Card style={{ width: "80%", marginRight: "20%", marginLeft: "20%" }}> */}
          <Image src={loginImg} fluid style={{ border: "none" }} />
          {/* </Card> */}
        </Col>
      </Row>
    </Container>
  );
}
