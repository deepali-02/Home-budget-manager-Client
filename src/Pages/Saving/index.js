import React, { useEffect } from "react";
import { Col, Image, Row, Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoal } from "../../store/Goal/action";
import { selectGoals } from "../../store/Goal/selector";
import { selectToken } from "../../store/user/selector";
// import moment from "moment";

import testImg from "../../images/test.png";
import { Link } from "react-router-dom";

export default function Saving() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goals = useSelector(selectGoals);
  const token = useSelector(selectToken);

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
              <Button onClick={() => navigate("/addSavingsGoal")}>
                Set saving goals
              </Button>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container>
          <Row className="mb-5 ">
            <Col>
              <Button
                variant="warning"
                style={{ position: "right" }}
                onClick={() => navigate("/addSavingsGoal")}
              >
                Set saving goals
              </Button>
            </Col>
          </Row>
          <Row xs={1} md={3}>
            {goals.map((goal) => (
              <>
                {/* <Row
                xs={2}
                md={4}
                lg={6}
                // md={4}
                // lg={6}
                // className="justify-content-md-center"
                style={{
                  borderStyle: "groove",
                  backgroundColor: "#82EEFD",
                  // height: "5rem",
                  // marginLeft: "10%",
                  // marginRight: "50%",
                }}
              >
                <Col style={{ textAlign: "right", backgroundColor: "#82EEFD" }}>
                  <b>{goal.goal_name}</b>
                </Col>

                <Col style={{ backgroundColor: "#82EEFD", textAlign: "right" }}>
                
                  <Link to={`/detail_savings/${goal.id}`}>
                    <Button
                      style={{ borderRadius: "50%", justifyContent: "right" }}
                    >
                      <h3>+</h3>
                    </Button>
                  </Link>
                </Col>
              </Row> */}
                <Container>
                  <Col>
                    <Card className="mb-5" bg="info" style={{ width: "18rem" }}>
                      <Card.Body>
                        <Card.Title>{goal.goal_name}</Card.Title>
                        <Link to={`/detail_savings/${goal.id}`}>
                          <Button variant="primary">Show details</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                </Container>
              </>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}
