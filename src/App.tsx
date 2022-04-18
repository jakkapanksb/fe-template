import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import AppRoutes from "./app/AppRoutes";
import { DateProvider } from "./common/components/DateProvider";
import { theme } from "./theme";

const queryClient = new QueryClient();

function App() {
  return (
    <DateProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
    </DateProvider>
  );
}

export default App;
