import React, { ReactNode, useMemo, useContext, createContext } from "react";

type AppContextPropsType = {
  children: ReactNode;
};

export type AppContextType = {
  values: any;
};

const defaultContextValue: AppContextType = {
  values: "test",
};

export const AppContext = createContext(defaultContextValue);

function AppContextProvider(props: AppContextPropsType) {
  const { children } = props;
  const values = "test2";

  const context = useMemo((): AppContextType => {
    return {
      values,
    };
  }, [values]);
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

export const useAppContext = (): AppContextType => useContext(AppContext);

export default AppContextProvider;
