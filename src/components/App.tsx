import React, { useState } from "react";
import styled, { ThemeProvider as SCThemeProvider } from "styled-components";
import {
  Theme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import {
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Tooltip,
} from "@material-ui/core";
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
import { HuntList } from "./HuntList";
import { orderedHunts } from "../functions/orderedHunts";
import { useToggleState } from "../hooks/useToggleState";

export type AppProps = {
  theme: Theme;
  bosses: Boss[];
};

type Editor = "time" | "location";

export const App: React.FC<AppProps> = ({ theme, bosses }) => {
  const [multiSpawn, toggleMultiSpawn] = useToggleState(false, true);
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
  const killNow = (hunt: Hunt) => {
    // Set kill time to now
    const killedHunt = hunt.update({ killTime: new Date() });
    replaceHunt(hunt, killedHunt);
    // Let user pick where they killed it
    startEditing(killedHunt, "location");
  };
  const selectableBosses = multiSpawn ? bosses : nonHuntedBosses(bosses, hunts);
  return (
    <MuiThemeProvider theme={theme}>
      <SCThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <CssBaseline />
          <Container>
            <Controls>
              <BossSelector
                bosses={selectableBosses}
                onSelect={startCreating}
              />
              <Tooltip title="Enable to allow multiple hunts per boss spawn (Useful for double spawn events)">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={multiSpawn}
                      onChange={toggleMultiSpawn}
                    />
                  }
                  label="Multi"
                />
              </Tooltip>
            </Controls>
            <HuntList
              hunts={orderedHunts(hunts)}
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

const Controls = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  & > :first-child {
    flex: 1;
    margin-right: 24px;
    & > :first-child {
      margin: 0;
    }
  }
`;

const nonHuntedBosses = (bosses: Boss[], hunts: Hunt[]) =>
  bosses.filter((boss) => !hunts.find((hunt) => hunt.boss === boss));
