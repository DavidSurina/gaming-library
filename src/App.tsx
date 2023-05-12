import React from "react";
import MainLayout from "components/Layout/MainLayout/MainLayout";
import MainRoute from "MainRoute";
import AppContextProvider from "globals/contexts/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "components/ErrorFallback/ErrorFallback";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <MainLayout>
            <MainRoute />
          </MainLayout>
        </AppContextProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
