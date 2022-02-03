import React from "react";
import { Col, Image, Row, Container, Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router";

import testImg from "../../images/test.png";

export default function Saving() {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Image
              src={testImg}
              style={{ width: "50%" }}
              fluid
              alt="No History image"
            />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <Button onClick={() => navigate("/addSavings")}>
              Set saving goals
            </Button>
          </Col>
          ]
        </Row>
      </Container>
      <Container></Container>
    </>
  );
}
