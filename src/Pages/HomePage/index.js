import img1 from "../../images/moneyslides_800x600.gif";
import logo from "../../images/HBM.jpeg";
import { Row, Image, Col } from "react-bootstrap";

export default function HomePage() {
  return (
    <>
      <Row className="mb-5" style={{ backgroundColor: "#E5D04A " }}>
        <h1 data-text="Spotlight">
          <img
            src={logo}
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "80px",
            }}
            alt=""
          />{" "}
          Welcome to Home Budget Manager
        </h1>
      </Row>

      <Row sx="auto" style={{ justifyContent: "center" }}>
        <Col>
          <Image
            thumbnail
            src={img1}
            style={{ borderRadius: "20px", border: "none" }}
            alt=""
          />
        </Col>
      </Row>
    </>
  );
}
