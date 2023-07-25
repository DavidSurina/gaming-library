import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { CurrentQueryType } from "./LibraryContext";

export type FilteringParamsType = Record<string, CurrentQueryType[]>;

type FilterContextPropType = {
  children: JSX.Element;
};

type FilterContextType = {
  filteringParams: FilteringParamsType;
  setFilteringParams: Dispatch<SetStateAction<FilteringParamsType>>;
};

const defaultContextValue: FilterContextType = {
  filteringParams: {},
  setFilteringParams: () => null,
};
export const FilterContext = createContext(defaultContextValue);

function FilterContextProvider(props: FilterContextPropType) {
  const { children } = props;
  const [filteringParams, setFilteringParams] = useState<FilteringParamsType>({
    genres: [],
    platform: [],
    publishers: [],
    metacritic: [],
    dates: [],
  });

  const context = (): FilterContextType => {
    return {
      filteringParams: filteringParams,
      setFilteringParams: setFilteringParams,
    };
  };

  return (
    <FilterContext.Provider value={context()}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilterContext = (): FilterContextType =>
  useContext(FilterContext);

export default FilterContextProvider;