import React, {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { rawgSubUrls } from "globals/functions/rawgApi";
import { rawgParams } from "globals/types/rawgParams";
import { Outlet, useLocation } from "react-router-dom";

export type CurrentQueryType = {
  queryKey: string;
  params: string;
};

export type LibContextType = {
  initialUrl: string;
  subUrl: string;
  setSubUrl: Dispatch<SetStateAction<string>>;
  currentQuery: CurrentQueryType;
  setCurrentQuery: Dispatch<SetStateAction<CurrentQueryType>>;
};

const initialQuery = {
  queryKey: "Best Games",
  params: rawgParams["Best Games"],
};

const defaultContextValue: LibContextType = {
  initialUrl: ``,
  subUrl: rawgSubUrls.game,
  setSubUrl: () => {},
  currentQuery: initialQuery,
  setCurrentQuery: () => {},
};

const LibContext = createContext(defaultContextValue);

function LibContextProvider() {
  const { state } = useLocation();
  const [subUrl, setSubUrl] = useState(rawgSubUrls.game);
  const [currentQuery, setCurrentQuery] = useState<CurrentQueryType>(
    state || initialQuery,
  );

  const initialUrl = `${subUrl}?${currentQuery.params}`;
  const context = (): LibContextType => {
    return {
      currentQuery,
      setCurrentQuery,
      subUrl,
      setSubUrl,
      initialUrl,
    };
  };
  return (
    <LibContext.Provider value={context()}>
      <Outlet />
    </LibContext.Provider>
  );
}

export const useLibContext = (): LibContextType => useContext(LibContext);

export default LibContextProvider;
