import React from "react";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import { HuntTimeline } from "./HuntTimeline";
import {
  Theme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Background } from "./Background";
import { BossSelector } from "./BossSelector";
import { useListState } from "./useListState";
import { Hunt } from "./Hunt";
import { EmptyState } from "./EmptyState";
import { createHunt } from "./createHunt";
import { Boss } from "./Boss";

export type AppProps = {
  theme: Theme;
  bosses: Boss[];
};

export const App: React.FC<AppProps> = ({ theme, bosses }) => {
  const [hunts, addHunt, removeHunt] = useListState<Hunt>(
    bosses.map(createHunt)
  );
  return (
    <MuiThemeProvider theme={theme}>
      <SCThemeProvider theme={theme}>
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
      </SCThemeProvider>
    </MuiThemeProvider>
  );
};

const openEditHuntUI = (hunt: Hunt) => alert("Edit UI for " + hunt.boss.name);

const notHuntedBosses = (bosses: Boss[], hunts: Hunt[]) =>
  bosses.filter((boss) => !hunts.find((hunt) => hunt.boss === boss));
