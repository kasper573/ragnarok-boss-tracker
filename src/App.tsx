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
import { EmptyState } from "./EmptyState";

function App() {
  const [hunts, addHunt] = useListState<Hunt>();
  const notHuntedBosses = bosses.filter((boss) => !hunts.find((hunt) => hunt.boss === boss));
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Background>
        <BossSelector
          bosses={notHuntedBosses}
          onSelect={(boss) => {
            addHunt({
              boss,
              map: boss.map,
              killTime: new Date(),
            });
          }}
        />
        {hunts.length > 0 ? <HuntTimeline hunts={hunts} /> : <EmptyState />}
      </Background>
    </ThemeProvider>
  );
}

export default App;
