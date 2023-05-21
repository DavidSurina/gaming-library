import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

import { HOME_ROUTE, LIBRARY_ROUTE } from "MainRoute";
import "./style.scss";

function CustomNavbar() {
  let location = useLocation();
  return (
    <Navbar bg="dark" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to={HOME_ROUTE}>
          GL
        </Navbar.Brand>
        <Nav
          className="me-auto"
          // activeKey={location.pathname}
          defaultActiveKey={HOME_ROUTE}
        >
          <Nav.Link as={NavLink} to={HOME_ROUTE}>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to={LIBRARY_ROUTE}>
            Library
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
