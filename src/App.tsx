import React from "react";
import { Timeline } from "./Timeline";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";
import { CssBaseline, IconButton, Tooltip } from "@material-ui/core";
import { Background } from "./Background";
import { HuntSelector } from "./HuntSelector";
import { List, Schedule } from "@material-ui/icons";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Background>
        <Tooltip title="Timeline">
          <IconButton>
            <Schedule />
          </IconButton>
        </Tooltip>
        <Tooltip title="List view">
          <IconButton>
            <List />
          </IconButton>
        </Tooltip>
        <HuntSelector />
        <Timeline />
      </Background>
    </ThemeProvider>
  );
}

export default App;
