import React from "react";
import { HOME_ROUTE } from "MainRoute";
import { NavLink } from "react-router-dom";
import "./style.scss";

function NotFound() {
  return (
    <section className="notFound-wrapper">
      <h1>Page not found</h1>
      <NavLink to={HOME_ROUTE}>Back to home</NavLink>
    </section>
  );
}

export default NotFound;
