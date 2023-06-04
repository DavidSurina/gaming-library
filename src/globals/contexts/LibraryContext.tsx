import React, {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { formatParams, rawgSubUrls } from "globals/functions/api";
import { rawgParams } from "globals/rawgParams";

type LibContextPropType = {
  children: JSX.Element;
};

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

const defaultContextValue: LibContextType = {
  initialUrl: ``,
  subUrl: rawgSubUrls.game,
  setSubUrl: () => {},
  currentQuery: {
    queryKey: "",
    params: "",
  },
  setCurrentQuery: () => {},
};

export const LibContext = createContext(defaultContextValue);

function LibContextProvider(props: LibContextPropType) {
  const { children } = props;

  const [subUrl, setSubUrl] = useState(rawgSubUrls.game);
  const [currentQuery, setCurrentQuery] = useState({
    queryKey: "best_games",
    params: formatParams(rawgParams["best_games"]),

  });

  const initialUrl = `${subUrl}?${currentQuery.params}`;

  const context = (): LibContextType => {
    return {
      setCurrentQuery,
      currentQuery,
      subUrl,
      setSubUrl,
      initialUrl,
    };
  };
  return (
    <LibContext.Provider value={context()}>{children}</LibContext.Provider>
  );
}

export const useLibContext = (): LibContextType => useContext(LibContext);

export default LibContextProvider;
