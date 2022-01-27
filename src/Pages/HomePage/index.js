import { Container } from "react-bootstrap";
import img1 from "../../images/moneyslides_800x600.gif";
import logo from "../../images/HBM.jpeg";
import { Card } from "react-bootstrap";

export default function HomePage() {
  return (
    <div>
      <Container>
        <h1>
          <img
            src={logo}
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "80px",
              // border: "none",
            }}
            alt=""
          />{" "}
          Welcome to Home Budget Manager
        </h1>
        <div className="color-overlay d-flex justify content center align-items-center">
          <Card
            style={{
              width: "80%",
              marginRight: "20%",
              marginLeft: "20%",
              border: "none",
            }}
          >
            <img src={img1} style={{ borderRadius: "20px" }} alt="" />
          </Card>
        </div>
      </Container>
    </div>
  );
}
