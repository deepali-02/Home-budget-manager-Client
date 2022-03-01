import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { selectToken } from "../../store/user/selector";
import { selectGoalDetails } from "../../store/Goal/selector";
import { detailsaving } from "../../store/Goal/action";
import { Card, Container, Button } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import moment from "moment";
// import { Link } from "react-router-dom";
import AddToSaving from "../../components/AddToSaving";

export default function DetailSavings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const { id } = useParams();
  const goalDetail = useSelector(selectGoalDetails);
  // console.log("detail", goalDetail);
  console.log("name", goalDetail.goal_name);
  const value = goalDetail.saved_amount;
  const maxValue = goalDetail.target_amount;
  const [mode, setMode] = useState(false);

  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
    dispatch(detailsaving(id));
  }, [dispatch, id, navigate, token]);
  return (
    <div>
    
      <Container>
        <Card className="text-center" style={{ border: "none" }}>
          <Card.Body>
            <Card.Title className="mb-5">
              <h2>Name: {goalDetail.goal_name}</h2>
            </Card.Title>
            <Card.Text>
              <p>
                {" "}
                <h4>
                  Desire Date:{" "}
                  {moment(goalDetail.desire_date).format("DD/MM/YYYY")}
                </h4>
                <h4>Target amount: {goalDetail.target_amount}€ </h4>
                <h4>
                  Saved amount:{" "}
                  {goalDetail.saved_amount === null
                    ? "0€"
                    : `${goalDetail.saved_amount}€`}
                </h4>
                <div
                  style={{
                    alignItems: "center",
                    width: 200,
                    height: 200,
                    marginLeft: "40%",
                  }}
                >
                  <CircularProgressbar
                    value={goalDetail.saved_amount}
                    maxValue={goalDetail.target_amount}
                    text={`${Math.round((value / maxValue) * 100)}%`}
                  />{" "}
                </div>
              </p>
            </Card.Text>

            <Button onClick={() => setMode(!mode)} variant="primary">
              {" "}
              {mode ? "Close" : "Add to saving"}
            </Button>
          </Card.Body>
        </Card>
        {mode && (
          <Card>
            <AddToSaving />
          </Card>
        )}
      </Container>
    </div>
  );
}
