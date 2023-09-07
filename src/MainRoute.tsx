import React from "react";
import GameDetail from "components/GameDetail/GameDetail";
import NotFound from "pages/NotFound/NotFound";
import GameLibrary from "pages/GameLibrary/GameLibrary";
import Home from "pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import LibContextProvider from "globals/contexts/LibraryContext";

export const HOME_ROUTE = "/";
export const LIBRARY_ROUTE = "/lib";
export const GAMES_ROUTE = "games";

function MainRoute() {
  return (
    <>
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={`${LIBRARY_ROUTE}/*`} element={<LibContextProvider />}>
          <Route path={GAMES_ROUTE} element={<GameLibrary />} />
          <Route path={`:id`} element={<GameDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default MainRoute;
