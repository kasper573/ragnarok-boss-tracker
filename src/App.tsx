import React from "react";
import { Timeline } from "./Timeline";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";
import { CssBaseline } from "@material-ui/core";
import { Background } from "./Background";
import { BossSelector } from "./BossSelector";
import { Boss } from "./Boss";

const bosses: Boss[] = [{ name: "lol" }, { name: "foo" }, { name: "bar" }];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Background>
        <BossSelector bosses={bosses} onSelect={(boss) => console.log(boss)} />
        <Timeline />
      </Background>
    </ThemeProvider>
  );
}

export default App;
