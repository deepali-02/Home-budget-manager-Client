import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMessage } from "../../store/appState/selector";
import { Alert } from "react-bootstrap";
import { clearMessage } from "../../store/appState/action";

export default function MessageBox() {
    const message = useSelector(selectMessage);
    const dispatch = useDispatch();
    const showMessage = message !== null;
    if (!showMessage) return null;
  
    return (
      <Alert
        show={showMessage}
        variant={message.variant}
        dismissible={message.dismissable}
        onClose={message.dismissable ? () => dispatch(clearMessage()) : null}
      >
        {message.text}
      </Alert>
    );
  }
  