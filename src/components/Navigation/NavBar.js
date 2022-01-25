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
    // <div>
    //   <NavLink to="/">Login</NavLink>
    //   <br />
    //   <NavLink to="/signup">Signup</NavLink>
    // </div>

    // <Navbar bg="dark" variant="dark">
    //   <Container>
    //     <Navbar.Brand href="#home">HBM</Navbar.Brand>
    //     <Nav className="me-auto">
    //       <Nav.Link to="/">Login</Nav.Link>
    //       <Nav.Link to="/signup">Signup</Nav.Link>
    //     </Nav>
    //   </Container>
    // </Navbar>
    // <>
    //   <Navbar
    //     collapseOnSelect
    //     fixed="top"
    //     expand="sm"
    //     bg="light"
    //     varient="dark"
    //   >
    //     <Navbar.Brand style={{ marginLeft: "5%" }} to="/">
    //       <img src={logo} width="70px" height="70px" alt="" />
    //     </Navbar.Brand>

    //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //     <Navbar.Collapse id="responsive-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link href="/">Home</Nav.Link>
    //         {loginLogoutControls}
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Navbar>
    // </>
    <>
      <Navbar expand="lg" variant="light">
        <Navbar.Brand as={NavLink} to="/">
          {" "}
          <img
            src={logo}
            width="70px"
            height="70px"
            alt=""
            style={{ borderRadius: "30px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavbarItem style={{ Text }} path="/" linkText="Home" />
            {token ? (
              <NavbarItem path="/my_expenses" linkText="My Expenses" />
            ) : null}
            {token ? <NavbarItem path="/history" linkText="History" /> : null}
            {/* <NavbarItem path="/addExpense" linkText=""/> */}
            {loginLogoutControls}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
