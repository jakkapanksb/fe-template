import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, CssBaseline, TextField, ThemeProvider } from "@mui/material";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { theme } from "./theme";
import dayjs from "dayjs";
import { CustomLocalizationProvider } from "./common/CustomLocalizationProvider";

function App() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  const setDayjsLocale = (locale: "en" | "th") => {
    dayjs.locale(locale);
    console.log("dayjs.locale():" + dayjs().locale());
  };

  return (
    <CustomLocalizationProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
            <Button onClick={() => setDayjsLocale("en")}>en</Button>
            <Button onClick={() => setDayjsLocale("th")}>th</Button>
            <DatePicker
              disableFuture
              label="Responsive"
              openTo="year"
              views={["year", "month", "day"]}
              value={value}
              inputFormat={
                dayjs.locale() === "th" ? "DD/MM/BBBB" : "DD/MM/YYYY"
              }
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </header>
          {"Child Component dayjs.locale():" + dayjs.locale()}
        </div>
      </ThemeProvider>
    </CustomLocalizationProvider>
  );
}

export default App;
