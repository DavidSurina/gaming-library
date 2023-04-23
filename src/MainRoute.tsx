import GameDetail from "components/GameDetail/GameDetail";
import GameLibrary from "pages/GameLibrary/GameLibrary";
import Home from "pages/Home/Home";
import React from "react";
import { Route, Routes } from "react-router-dom";

export const HOME_ROUTE = "/home";
export const LIBRARY_ROUTE = "/lib";
export const DETAIL_ROUTE = "/detail";

function MainRoute() {
  return (
    <>
      <Routes>
        <Route index path={HOME_ROUTE} element={<Home />} />
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={LIBRARY_ROUTE} element={<GameLibrary />} />
        <Route path={`${DETAIL_ROUTE}/:id`} element={<GameDetail />} />
      </Routes>
    </>
  );
}

export default MainRoute;
