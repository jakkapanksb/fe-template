import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import logo from "./logo.svg";
import theme from "./theme";
import { DateProvider } from "./common/components/DateProvider";
import { Button, CssBaseline, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import "./apis/core/prepareApiMocks";
import getMorty from "./apis/sample/getMorty";
import { GetMorty } from "./apis/sample/types/GetMorty";
import { environment } from "./utils";

const queryClient = new QueryClient();

function App() {
  const [data, setData] = useState<any>();
  return (
    <DateProvider>
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
            <Button
              variant="contained"
              onClick={async () => {
                const data = await getMorty();
                setData(data.data);
              }}
            >
              Fetch Morty!
            </Button>
            <Typography>
              {environment.settings.shouldMockApiResponse
                ? data?.data.name
                : data?.name}
            </Typography>
          </div>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
    </DateProvider>
  );
}

export default App;
