import React, {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { rawgSubUrls } from "globals/functions/api";
import { rawgParams } from "globals/rawgParams";

type LibContextPropType = {
  children: JSX.Element;
};

export type CurrentQueryType = [string, string];

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
  currentQuery: ["Best Games", rawgParams["Best Games"]],
  setCurrentQuery: () => {},
};

export const LibContext = createContext(defaultContextValue);

function LibContextProvider(props: LibContextPropType) {
  const { children } = props;

  const [subUrl, setSubUrl] = useState(rawgSubUrls.game);
  const [currentQuery, setCurrentQuery] = useState<CurrentQueryType>([
    "Best Games",
    rawgParams["Best Games"],
  ]);

  const initialUrl = `${subUrl}?${currentQuery[1]}`;
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
    <LibContext.Provider value={context()}>{children}</LibContext.Provider>
  );
}

export const useLibContext = (): LibContextType => useContext(LibContext);

export default LibContextProvider;
