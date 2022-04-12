import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import logo from "./logo.svg";
import { theme } from "./theme";
import { DateProvider } from "./common/components/DateProvider";
import { Box, Button, CssBaseline, TextField } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage, updateLanguage } from "./features/core/coreSlice";
import { Language } from "./features/core/types/CoreState";
import { DatePicker } from "@mui/x-date-pickers";

const queryClient = new QueryClient();

function App() {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);

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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={() => {
                      dispatch(updateLanguage(Language.EN));
                    }}
                  >
                    EN
                  </Button>
                  <Button
                    onClick={() => {
                      dispatch(updateLanguage(Language.TH));
                    }}
                  >
                    TH
                  </Button>
                </Box>
                <DatePicker
                  disableFuture
                  label="Responsive"
                  openTo="year"
                  views={["year", "month", "day"]}
                  inputFormat={
                    language === Language.TH ? "DD/MM/BBBB" : "DD/MM/YYYY"
                  }
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </header>
          </div>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
    </DateProvider>
  );
}

export default App;
