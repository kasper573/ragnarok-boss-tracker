import React, { useState } from "react";
import styled, { ThemeProvider as SCThemeProvider } from "styled-components";
import { HuntTimeline } from "./HuntTimeline";
import {
  Theme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Container } from "./Container";
import { BossSelector } from "./BossSelector";
import { useListState } from "../hooks/useListState";
import { Hunt } from "../state/Hunt";
import { Boss } from "../state/Boss";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { HuntTimeEditor } from "./HuntTimeEditor";
import { HuntLocationEditor } from "./HuntLocationEditor";
import { loadFromLocalStorage, saveToLocalStorage } from "../state/storage";
import { Footer } from "./Footer";

export type AppProps = {
  theme: Theme;
  bosses: Boss[];
};

type Editor = "time" | "location";

export const App: React.FC<AppProps> = ({ theme, bosses }) => {
  const [hunts, addHunt, removeHunt, replaceHunt] = useListState<Hunt>(
    () => loadFromLocalStorage(bosses),
    saveToLocalStorage
  );
  const [editedHunt, setEditedHunt] = useState<Hunt>();
  const [visibleEditor, setVisibleEditor] = useState<Editor>();
  const stopEditing = () => setVisibleEditor(undefined);
  const startEditing = (hunt: Hunt, editor: Editor) => {
    setEditedHunt(hunt);
    setVisibleEditor(editor);
  };
  const saveEdit = (updatedHunt: Hunt, stop = true) => {
    setEditedHunt(updatedHunt);
    if (!replaceHunt(editedHunt!, updatedHunt)) {
      addHunt(updatedHunt);
    }
    if (stop) {
      stopEditing();
    }
  };
  const startCreating = (boss: Boss) => addHunt(new Hunt(boss));
  const killNow = (hunt: Hunt) =>
    replaceHunt(hunt, hunt.update({ killTime: new Date() }));
  return (
    <MuiThemeProvider theme={theme}>
      <SCThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <CssBaseline />
          <Container>
            <BossSelectorPadding>
              <BossSelector bosses={bosses} onSelect={startCreating} />
            </BossSelectorPadding>
            <HuntTimeline
              hunts={hunts}
              onDelete={removeHunt}
              onKillNow={killNow}
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
                  onChange={(hunt) => saveEdit(hunt, false)}
                />
              </>
            )}
          </Container>
          <Footer />
        </MuiPickersUtilsProvider>
      </SCThemeProvider>
    </MuiThemeProvider>
  );
};

const BossSelectorPadding = styled.div`
  padding: 0 16px;
`;
