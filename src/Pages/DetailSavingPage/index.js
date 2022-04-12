import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import {
  Card,
  Container,
  Button,
  Alert,
  Form,
  Stack,
  Row,
  Col,
} from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import moment from "moment";
import { BUTTON_COLOR } from "../../config/constants";

import { selectToken } from "../../store/user/selector";
import { selectGoalDetails } from "../../store/Goal/selector";
import { detailsaving } from "../../store/Goal/action";
import { deleteSaving } from "../../store/Goal/action";
import AddToSaving from "../../components/AddToSaving";
import { changeGoalDate } from "../../store/Goal/action";

import {
  AlertDialog,
  AlertDialogLabel,
  AlertDialogDescription,
} from "@reach/alert-dialog";

export default function DetailSavings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const { id } = useParams();
  const goalDetail = useSelector(selectGoalDetails);

  const value = goalDetail.saved_amount;
  const maxValue = goalDetail.target_amount;
  const [mode, setMode] = useState(false);
  const [dateMode, setDateMode] = useState(false);
  const [desire_date, setDesire_date] = useState("");

  const [showDialog, setShowDialog] = useState(false);
  const cancelRef = useRef();
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  const onDelete = (id) => {
    dispatch(deleteSaving(id));
    navigate("/savings");
  };

  const handleClick = (e) => {
    dispatch(changeGoalDate(desire_date));
  };
  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
    dispatch(detailsaving(id));
  }, [dispatch, id, navigate, token]);

  const date1 = new Date(goalDetail.desire_date);
  const date2 = new Date();

  console.log("goal date", date1);
  console.log("today's date", date2);

  return (
    <div>
      {date1 < date2 && (
        <Alert variant="danger">
          <Alert.Heading>
            Sorry!!🙁 You are fail to achieve your{" "}
            <b>"{goalDetail.goal_name}"</b> saving goal within set time.🗓⌛{" "}
          </Alert.Heading>
          <p>
            Do you stiil want to save for <b>{goalDetail.goal_name}</b>?{" "}
            <Button
              variant="outline-danger"
              onClick={() => setDateMode(!dateMode)}
            >
              {" "}
              Change desire date
            </Button>
          </p>
          <Container className="col-md-5 mx-auto">
            {dateMode && (
              <Stack gap={2} className="col-md-5 mx-auto">
                <Form.Group>
                  <Form.Label>Pick new date</Form.Label>
                  <Form.Control
                    value={desire_date}
                    onChange={(e) => setDesire_date(e.target.value)}
                    type="date"
                  />
                  <Button
                    className="mt-5"
                    style={{ backgroundColor: `${BUTTON_COLOR}` }}
                    onClick={handleClick}
                  >
                    Save Changes
                  </Button>
                </Form.Group>
              </Stack>
            )}
          </Container>
        </Alert>
      )}

      <Container>
        <Card
          className="text-center"
          style={{ border: "none", backgroundColor: "lightgoldenrodyellow" }}
        >
          <Card.Body>
            <Card.Title className="mb-5">
              <h2> {goalDetail.goal_name} </h2>
            </Card.Title>
            <Card.Text>
              <Row className="justify-content-md-center">
                <Col
                  className="justify-content-md-center mt-5"
                  style={{ color: "#660033" }}
                >
                  <p>
                    {" "}
                    <h5>
                      Desire Date:{" "}
                      <b>
                        {moment(goalDetail.desire_date).format("DD/MM/YYYY")}
                      </b>
                    </h5>
                    <h5>
                      Target amount: <b>{goalDetail.target_amount}€ </b>
                    </h5>
                    <h5>
                      Saved amount:{" "}
                      <b>
                        {goalDetail.saved_amount === null
                          ? "0€"
                          : `${goalDetail.saved_amount}€`}
                      </b>
                    </h5>
                  </p>
                </Col>
                <Col>
                  <p>
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
                </Col>
              </Row>
            </Card.Text>
            <Row>
              <Col>
                <Button
                  onClick={() => setMode(!mode)}
                  size="lg"
                  variant="warning"
                  style={{ backgroundColor: `${BUTTON_COLOR}`, color: "white" }}
                >
                  {" "}
                  {mode ? "Close" : "Add to saving"}
                </Button>
              </Col>
              <Col>
                <Button variant="outline-danger" onClick={open}>
                  Delete this saving <b>❌</b>
                </Button>
                {showDialog && (
                  <AlertDialog leastDestructiveRef={cancelRef}>
                    <AlertDialogLabel>
                      <h3>
                        <b>Please Confirm!</b>
                      </h3>
                    </AlertDialogLabel>

                    <AlertDialogDescription>
                      Are you sure you want to delete this saving? This action
                      is permanent. By deleting, you can't keep track of{" "}
                      <b>{goalDetail.goal_name}</b> anymore.
                    </AlertDialogDescription>

                    <div className="alert-buttons">
                      <Row className="mt-5">
                        <Col>
                          <Button
                            variant="danger"
                            onClick={() => onDelete(goalDetail.id)}
                          >
                            Yes, delete
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="secondary"
                            ref={cancelRef}
                            onClick={close}
                          >
                            Nevermind, don't delete.
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </AlertDialog>
                )}
              </Col>
            </Row>
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
