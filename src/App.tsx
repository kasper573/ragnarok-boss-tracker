import React from "react";
import "./App.css";
import CustomizedTimeline from "./Timeline";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";
import { CssBaseline } from "@material-ui/core";
import { Background } from "./Background";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Background>
        <CustomizedTimeline />
      </Background>
    </ThemeProvider>
  );
}

export default App;
