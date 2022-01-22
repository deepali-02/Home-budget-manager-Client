import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/action";
import Button from "@restart/ui/esm/Button";
import { selectUser } from "../../store/user/selector";
import { Nav } from "react-bootstrap";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <>
      <Nav.Link style={{ padding: ".5rem 1rem" }}>{user.email}</Nav.Link>
      <Button onClick={() => dispatch(logOut())} class="btn btn-outline-light">Logout</Button>
    </>
  );
}
