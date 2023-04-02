import React from "react";
import MainLayout from "components/Layout/MainLayout/MainLayout";
import MainRoute from "MainRoute";
import AppContextProvider from "globals/contexts/AppContext";

function App() {
  return (
    <AppContextProvider>
      <MainLayout>
        <MainRoute />
      </MainLayout>
    </AppContextProvider>
  );
}

export default App;
