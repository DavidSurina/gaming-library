import React from "react";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import MainLayout from "components/Layout/MainLayout/MainLayout";
import MainRoute from "MainRoute";
import AppContextProvider from "globals/contexts/AppContext";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "components/ErrorFallback/ErrorFallback";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
            <QueryClientProvider client={queryClient}>
              <AppContextProvider>
                <MainLayout>
                  <MainRoute />
                </MainLayout>
              </AppContextProvider>
            </QueryClientProvider>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </ThemeProvider>
  );
}

export default App;
