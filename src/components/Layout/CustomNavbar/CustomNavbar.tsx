import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Controller as ControllerIcon } from "react-bootstrap-icons";

import { HOME_ROUTE, LIBRARY_ROUTE } from "MainRoute";
import "./style.scss";

function CustomNavbar() {
  return (
    <Navbar sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to={HOME_ROUTE}>
          <ControllerIcon size={40} />
          <span>G</span>
          <span>ame</span>
          <span>L</span>
          <span>ibrary</span>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to={HOME_ROUTE}>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to={`${LIBRARY_ROUTE}`}>
            Library
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
