import { Col, Container, Row } from "react-bootstrap";
import meImg from "../../images/me.jpg";
import "./AboutMe.css";

export default function AboutMe() {
  return (
    <Container fluid className="container1">
      <Row>
        <Col className="mt-5 mb-5" style={{ marginLeft: "20%" }}>
          <div class="container2">
            <img
              src={meImg}
              alt="Avatar"
              class="image"
              style={{ width: "100%" }}
            />
            <div class="middle">
              <div class="text">
                <h3>Dipali</h3>
              </div>
            </div>
          </div>
        </Col>
        <Col className="mt-5 mb-5" style={{ marginRight: "30%" }}>
          <h1>
            Hello!!! <br /> I am Dipali{" "}
          </h1>
          <br />
          <h2>Full Stack Developer</h2>
          <p></p>
        </Col>
      </Row>
    </Container>
  );
}
