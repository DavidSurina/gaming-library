import React from "react";
import { NavLink } from "react-router-dom";

import { HOME_ROUTE, LIBRARY_ROUTE } from "MainRoute";
import "./style.scss";

function Navbar() {
  return (
    <nav className="navbar-wrapper">
      <NavLink to={HOME_ROUTE} className="navbar-link">
        Home
      </NavLink>
      <NavLink to={LIBRARY_ROUTE} className="navbar-link">
        Library
      </NavLink>
    </nav>
  );
}

export default Navbar;
