import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import logo from "../../images/HBM.jpeg";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import NavbarItem from "./NavbarItem";
import { selectUser } from "../../store/user/selector";
import { useSelector } from "react-redux";
import "./style.css";
export default function NavBar() {
  const { token } = useSelector(selectUser);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <>
      <Navbar expand="lg" style={{ color: "#660000" }}>
        <Navbar.Brand as={NavLink} to="/">
          {" "}
          <img
            src={logo}
            width="70px"
            height="70px"
            alt=""
            style={{ borderRadius: "30px", border: "none" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{ color: "#660000" }}>
            <NavbarItem style={{ Text }} path="/" linkText="Home" />
            {/* <NavbarItem path="/about" linkText="About Me" /> */}
            {token ? (
              <NavbarItem path="/my_expenses" linkText="My Expenses" />
            ) : null}
            {token ? <NavbarItem path="/history" linkText="History" /> : null}
            {token ? <NavbarItem path="/savings" linkText="Savings" /> : null}
            {loginLogoutControls}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
