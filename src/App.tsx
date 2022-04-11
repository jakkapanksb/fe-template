import logo from "./logo.svg";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { CustomLocalizationProvider } from "./common/components/CustomLocalizationProvider";

function App() {
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
          </header>
        </div>
      </ThemeProvider>
    </CustomLocalizationProvider>
  );
}

export default App;
