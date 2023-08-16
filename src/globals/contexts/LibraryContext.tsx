import React, {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { rawgSubUrls } from "globals/functions/api";
import { rawgParams } from "globals/types/rawgParams";

type LibContextPropType = {
  children: JSX.Element;
};

export type CurrentQueryType = {
  queryKey: string;
  params: string;
};

const initialQuery = {
  queryKey: "Best Games",
  params: rawgParams["Best Games"],
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
  currentQuery: initialQuery,
  setCurrentQuery: () => {},
};

const LibContext = createContext(defaultContextValue);

function LibContextProvider(props: LibContextPropType) {
  const { children } = props;

  const [subUrl, setSubUrl] = useState(rawgSubUrls.game);
  const [currentQuery, setCurrentQuery] =
    useState<CurrentQueryType>(initialQuery);

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
    <LibContext.Provider value={context()}>{children}</LibContext.Provider>
  );
}

export const useLibContext = (): LibContextType => useContext(LibContext);

export default LibContextProvider;
