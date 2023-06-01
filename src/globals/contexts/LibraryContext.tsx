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

type QueryParams = {
  queryKey: string;
  params: string;
};

export type LibContextType = {
  initialUrl: string;
  subUrl: string;
  setSubUrl: Dispatch<SetStateAction<string>>;
  queryParams: QueryParams;
  setQueryParams: Dispatch<SetStateAction<QueryParams>>;
};

const defaultContextValue: LibContextType = {
  initialUrl: ``,
  subUrl: rawgSubUrls.game,
  setSubUrl: () => {},
  queryParams: {
    queryKey: "",
    params: "",
  },
  setQueryParams: () => {},
};

export const LibContext = createContext(defaultContextValue);

function LibContextProvider(props: LibContextPropType) {
  const { children } = props;

  const [subUrl, setSubUrl] = useState(rawgSubUrls.game);
  const [queryParams, setQueryParams] = useState({
    queryKey: "bestGames",
    params: formatParams(rawgParams["bestGames"]),
  });

  const initialUrl = `${subUrl}?${queryParams.params}`;

  const context = (): LibContextType => {
    return {
      queryParams,
      setQueryParams,
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
