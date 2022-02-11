import React, { useEffect } from "react";
import { Col, Image, Row, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoal } from "../../store/Goal/action";
import { selectGoals } from "../../store/Goal/selector";
import { selectToken } from "../../store/user/selector";
import moment from "moment";

import testImg from "../../images/test.png";

export default function Saving() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goals = useSelector(selectGoals);
  const token = useSelector(selectToken);
  console.log("token", token);

  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
    dispatch(fetchGoal());
  }, [dispatch, token, navigate]);
  return (
    <>
      {goals.length === 0 ? (
        <Container>
          <Row style={{}}>
            <Col>
              <Image
                src={testImg}
                style={{ width: "50%" }}
                fluid
                alt="No goal image"
              />
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col>
              <Button onClick={() => navigate("/addSavings")}>
                Set saving goals
              </Button>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container fluid>
          <Row className="mb-5 ">
            <Col>
              <Button
                variant="warning"
                style={{ position: "right" }}
                onClick={() => navigate("/addSavings")}
              >
                Set saving goals
              </Button>
            </Col>
          </Row>
          {goals.map((goal) => (
            <Row
              // sx={4}
              // md={4}
              // lg={6}
              className="mb-3 mt-3 justify-content-md-center"
              style={{
                borderStyle: "groove",
                backgroundColor: "#E3C565",
                height: "5rem",
                marginLeft: "10%",
                marginRight: "10%",
              }}
            >
              <Col
                className="mt-3"
                style={{ textAlign: "left", backgroundColor: "#E3C565" }}
              >
                <b>{goal.goal_name}</b>
              </Col>
              <Col className="mt-3" style={{ backgroundColor: "#E3C565" }}>
                <b>Target: {goal.target_amount}€</b>
              </Col>
              <Col className="mt-3" style={{ backgroundColor: "#E3C565" }}>
                <b>
                  Desire date: {moment(goal.desire_date).format("DD/MM/YYYY")}
                </b>
              </Col>
              <Col className="mt-3">
                <b>Saved: {goal.saved_amount}</b>
              </Col>
              <Col
                className="mt-3"
                style={{ backgroundColor: "#E3C565", textAlign: "right" }}
              >
                <Button
                  style={{ borderRadius: "50%", justifyContent: "right" }}
                >
                  <h3>+</h3>
                </Button>
              </Col>
            </Row>
          ))}
        </Container>
      )}
    </>
  );
}
