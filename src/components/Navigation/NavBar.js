import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

import logo from "../../images/HBM.jpeg";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import NavbarItem from "./NavbarItem";
import { selectUser } from "../../store/user/selector";
import { useSelector } from "react-redux";

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

    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={NavLink} to="/">
        <img src={logo} width="70px" height="70px" alt="" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          <NavbarItem path="/" linkText="home" />
          {token ? (
            <NavbarItem path="/my_expenses" linkText="my_expenses" />
          ) : null}
          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
