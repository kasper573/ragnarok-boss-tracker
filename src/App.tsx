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
import { createHunt } from "./createHunt";
import { Boss } from "./Boss";

function App() {
  const [hunts, addHunt, removeHunt] = useListState<Hunt>(
    bosses.map(createHunt)
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Background>
        <BossSelector
          bosses={notHuntedBosses(bosses, hunts)}
          onSelect={(boss) => addHunt(createHunt(boss))}
        />
        {hunts.length > 0 ? (
          <HuntTimeline
            hunts={hunts}
            onDelete={removeHunt}
            onEdit={openEditHuntUI}
          />
        ) : (
          <EmptyState />
        )}
      </Background>
    </ThemeProvider>
  );
}

const openEditHuntUI = (hunt: Hunt) => alert("Edit UI for " + hunt.boss.name);

const notHuntedBosses = (bosses: Boss[], hunts: Hunt[]) =>
  bosses.filter((boss) => !hunts.find((hunt) => hunt.boss === boss));

export default App;
