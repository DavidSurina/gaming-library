import React from "react";
import GameDetail from "components/GameDetail/GameDetail";
import NotFound from "pages/NotFound/NotFound";
import GameLibrary from "pages/GameLibrary/GameLibrary";
import Home from "pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import LibContextProvider from "globals/contexts/LibraryContext";

export const HOME_ROUTE = "/";
export const LIBRARY_ROUTE = "/lib";
export const DETAIL_ROUTE = "/detail";

function MainRoute() {
  return (
    <>
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route
          path={LIBRARY_ROUTE}
          element={
            <LibContextProvider>
              <GameLibrary />
            </LibContextProvider>
          }
        />
        <Route path={`${DETAIL_ROUTE}/:id`} element={<GameDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default MainRoute;
