import React, { useEffect } from "react";
import { Col, Image, Row, Container, Button, Card } from "react-bootstrap";
import { BUTTON_COLOR } from "../../config/constants";
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
              <Button
                style={{
                  background: `${BUTTON_COLOR}`,
                  color: "white",
                  borderRadius: "5px",
                }}
                onClick={() => navigate("/addSavingsGoal")}
              >
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
                size="lg"
                style={{
                  position: "center",
                  backgroundColor: `${BUTTON_COLOR}`,
                  color: "white",
                  borderRadius: "10px",
                }}
                onClick={() => navigate("/addSavingsGoal")}
              >
                Set saving goals
              </Button>
            </Col>
          </Row>
          <Row xs={1} md={3}>
            {goals.map((goal) => (
              <>
                {goal.saved_amount !== goal.target_amount && (
                  <Container>
                    <Col>
                      <Card
                        className="mb-5"
                        // bg="info"
                        style={{ width: "18rem", backgroundColor: "#663366" }}
                      >
                        <Card.Body>
                          <Card.Title
                            style={{ color: "whitesmoke", fontStyle: "italic" }}
                          >
                            <h4>{goal.goal_name}</h4>
                          </Card.Title>
                          <Link to={`/detail_savings/${goal.id}`}>
                            <Button
                              style={{
                                backgroundColor: "#CC6666",
                                border: "#CCFF66",
                              }}
                            >
                              Show details
                            </Button>
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Container>
                )}
              </>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}
