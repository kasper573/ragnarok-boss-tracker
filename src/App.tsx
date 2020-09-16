import React, { useState } from "react";
import styled, { ThemeProvider as SCThemeProvider } from "styled-components";
import { HuntTimeline } from "./HuntTimeline";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, useMediaQuery } from "@material-ui/core";
import { Container } from "./Container";
import { BossSelector } from "./BossSelector";
import { useListState } from "./useListState";
import { Hunt } from "./Hunt";
import { Boss } from "./Boss";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { HuntTimeEditor } from "./HuntTimeEditor";
import { createAppTheme } from "./theme";
import { HuntLocationEditor } from "./HuntLocationEditor";

export type AppProps = {
  bosses: Boss[];
};

type Editor = "time" | "location";

export const App: React.FC<AppProps> = ({ bosses }) => {
  const prefersDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const [hunts, addHunt, removeHunt, replaceHunt] = useListState<Hunt>(
    bosses.map((boss) => new Hunt(boss))
  );
  const [editedHunt, setEditedHunt] = useState<Hunt>();
  const [visibleEditor, setVisibleEditor] = useState<Editor>();
  const stopEditing = () => setVisibleEditor(undefined);
  const startEditing = (hunt: Hunt, editor: Editor) => {
    setEditedHunt(hunt);
    setVisibleEditor(editor);
  };
  const saveEdit = (updatedHunt: Hunt) => {
    if (!replaceHunt(editedHunt!, updatedHunt)) {
      addHunt(updatedHunt);
    }
    stopEditing();
  };
  const startCreating = (boss: Boss) => startEditing(new Hunt(boss), "time");
  const theme = createAppTheme(prefersDarkTheme ? "dark" : "light");
  return (
    <MuiThemeProvider theme={theme}>
      <SCThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <CssBaseline />
          <Container>
            <BossSelectorPadding>
              <BossSelector
                bosses={notHuntedBosses(bosses, hunts)}
                onSelect={startCreating}
              />
            </BossSelectorPadding>
            <HuntTimeline
              hunts={hunts}
              onDelete={removeHunt}
              onEditKillTime={(hunt) => startEditing(hunt, "time")}
              onEditTombstoneLocation={(hunt) => startEditing(hunt, "location")}
            />
            {editedHunt && (
              <>
                <HuntTimeEditor
                  value={editedHunt}
                  open={visibleEditor === "time"}
                  onClose={stopEditing}
                  onChange={saveEdit}
                />
                <HuntLocationEditor
                  value={editedHunt}
                  open={visibleEditor === "location"}
                  onClose={stopEditing}
                  onChange={saveEdit}
                />
              </>
            )}
          </Container>
        </MuiPickersUtilsProvider>
      </SCThemeProvider>
    </MuiThemeProvider>
  );
};

const notHuntedBosses = (bosses: Boss[], hunts: Hunt[]) =>
  bosses.filter((boss) => !hunts.find((hunt) => hunt.boss === boss));

const BossSelectorPadding = styled.div`
  padding: 0 16px;
`;
