import React from "react";
import { Route, Routes } from "react-router-dom";

export const HOME_ROUTE = "/home";
export const LIBRARY_ROUTE = "/lib";

function MainRoute() {
  return (
    <>
      <Routes>
        <Route index element={<div>Home route</div>} />
        <Route path={HOME_ROUTE} element={<div>Home route</div>} />
        <Route path={LIBRARY_ROUTE} element={<div>Libary</div>} />
      </Routes>
    </>
  );
}

export default MainRoute;
