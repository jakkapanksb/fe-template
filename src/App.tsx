import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import logo from "./logo.svg";
import { theme } from "./theme";
import { CustomLocalizationProvider } from "./common/components/CustomLocalizationProvider";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";

const queryClient = new QueryClient();

function App() {
  return (
    <CustomLocalizationProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
    </CustomLocalizationProvider>
  );
}

export default App;
