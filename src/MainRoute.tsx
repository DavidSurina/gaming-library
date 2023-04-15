import GameLibrary from "pages/GameLibrary/GameLibrary";
import Home from "pages/Home/Home";
import React from "react";
import { Route, Routes } from "react-router-dom";

export const HOME_ROUTE = "/home";
export const LIBRARY_ROUTE = "/lib";

function MainRoute() {
  return (
    <>
      <Routes>
        <Route index element={<div>Home route</div>} />
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={LIBRARY_ROUTE} element={<GameLibrary />} />
      </Routes>
    </>
  );
}

export default MainRoute;
