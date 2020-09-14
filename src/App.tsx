import React from "react";
import { HuntTimeline } from "./HuntTimeline";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";
import { CssBaseline } from "@material-ui/core";
import { Background } from "./Background";
import { BossSelector } from "./BossSelector";
import { bosses } from "./bossesFixture";
import { useListState } from "./useListState";
import { Hunt } from "./Hunt";

function App() {
  const [hunts, addHunt] = useListState<Hunt>();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Background>
        <BossSelector
          bosses={bosses}
          onSelect={(boss) => {
            addHunt({
              boss,
              map: boss.map,
              killTime: new Date(),
            });
          }}
        />
        <HuntTimeline hunts={hunts} />
      </Background>
    </ThemeProvider>
  );
}

export default App;
