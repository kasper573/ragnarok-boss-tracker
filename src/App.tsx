import React, { useState } from "react";
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
import { Boss } from "./Boss";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { HuntEditor } from "./HuntEditor";

export type AppProps = {
  theme: Theme;
  bosses: Boss[];
};

export const App: React.FC<AppProps> = ({ theme, bosses }) => {
  const [hunts, addHunt, removeHunt, replaceHunt] = useListState<Hunt>(
    bosses.map((boss) => new Hunt(boss))
  );
  const [editedHunt, setEditedHunt] = useState<Hunt>();
  const [isEditing, setEditing] = useState(false);
  const stopEditing = () => setEditing(false);
  const startEditing = (hunt: Hunt) => {
    setEditedHunt(hunt);
    setEditing(true);
  };
  const saveEdit = (updatedHunt: Hunt) => {
    if (!replaceHunt(editedHunt!, updatedHunt)) {
      addHunt(updatedHunt);
    }
    stopEditing();
  };
  const startCreating = (boss: Boss) => startEditing(new Hunt(boss));
  return (
    <MuiThemeProvider theme={theme}>
      <SCThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <CssBaseline />
          <Background>
            <BossSelector
              bosses={notHuntedBosses(bosses, hunts)}
              onSelect={startCreating}
            />
            {hunts.length > 0 ? (
              <HuntTimeline
                hunts={hunts}
                onDelete={removeHunt}
                onEdit={startEditing}
              />
            ) : (
              <EmptyState />
            )}
            {editedHunt && (
              <HuntEditor
                value={editedHunt}
                open={isEditing}
                onClose={stopEditing}
                onChange={saveEdit}
              />
            )}
          </Background>
        </MuiPickersUtilsProvider>
      </SCThemeProvider>
    </MuiThemeProvider>
  );
};

const notHuntedBosses = (bosses: Boss[], hunts: Hunt[]) =>
  bosses.filter((boss) => !hunts.find((hunt) => hunt.boss === boss));
