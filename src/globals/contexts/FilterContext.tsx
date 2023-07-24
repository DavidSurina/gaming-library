import React, { createContext, useContext } from "react";

type FilterContextPropType = {
  children: JSX.Element;
};

type FilterContextType = {};

const defaultContextValue: FilterContextType = {};
export const FilterContext = createContext(defaultContextValue);

function FilterContextProvider(props: FilterContextPropType) {
  const { children } = props;

  const context = (): FilterContextType => {
    return {
      // TODO context
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
