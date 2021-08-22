import React, { useState } from "react";
import styled, { ThemeProvider as SCThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Theme } from "@material-ui/core";
import { Container } from "./Container";
import { MobSelector } from "./MobSelector";
import { Hunt } from "../state/Hunt";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KillTimeEditor } from "./KillTimeEditor";
import { HuntLocationEditor } from "./HuntLocationEditor";
import { Footer } from "./Footer";
import { HuntList } from "./HuntList";
import { orderedHunts } from "../functions/orderedHunts";
import { MobEditor } from "./MobEditor";
import { useDispatch, useSelector } from "../state/store";
import {
  selectHunt,
  selectHunts,
  selectMob,
  selectMobDictionary,
} from "../state/selectors";
import { slice } from "../state/slice";
import { MobInstanceId } from "../state/Mob";

type Editor = "time" | "location" | "mob";

export const App = ({ theme }: { theme: Theme }) => {
  const dispatch = useDispatch();
  const mobDictionary = useSelector(selectMobDictionary);
  const hunts = useSelector(selectHunts);
  const [editedHuntId, setEditedHuntId] = useState<MobInstanceId>();
  const editedHunt = useSelector(selectHunt(editedHuntId));
  const editedMob = useSelector(selectMob(editedHuntId));
  const [visibleEditor, setVisibleEditor] = useState<Editor>();
  const stopEditing = () => setVisibleEditor(undefined);
  const startEditing = (hunt: Hunt, editor: Editor) => {
    setEditedHuntId(hunt.id);
    setVisibleEditor(editor);
  };

  const killNow = (hunt: Hunt) => {
    dispatch(slice.actions.setKillTime({ id: hunt.id, killTime: Date.now() }));
    startEditing(hunt, "location");
  };

  return (
    <MuiThemeProvider theme={theme}>
      <SCThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <CssBaseline />
          <Container>
            <Controls>
              <MobSelector
                onSelect={(mob) => dispatch(slice.actions.hunt(mob.instanceId))}
              />
            </Controls>
            <HuntList
              hunts={orderedHunts(hunts, mobDictionary)}
              onDelete={(hunt) => dispatch(slice.actions.stopHunting(hunt.id))}
              onKillNow={killNow}
              onEditKillTime={(hunt) => startEditing(hunt, "time")}
              onEditMobInfo={(hunt) => startEditing(hunt, "mob")}
              onEditTombstoneLocation={(hunt) => startEditing(hunt, "location")}
            />
            {editedHunt && (
              <>
                <KillTimeEditor
                  value={editedHunt.killTime}
                  open={visibleEditor === "time"}
                  onClose={stopEditing}
                  onChange={(killTime) => {
                    dispatch(
                      slice.actions.setKillTime({ id: editedHunt.id, killTime })
                    );
                    stopEditing();
                  }}
                />
                <HuntLocationEditor
                  value={editedHunt}
                  open={visibleEditor === "location"}
                  onClose={stopEditing}
                  onChange={(tombstoneLocation) =>
                    dispatch(
                      slice.actions.setTombstoneLocation({
                        id: editedHunt.id,
                        tombstoneLocation,
                      })
                    )
                  }
                />
                {editedMob && (
                  <MobEditor
                    value={editedMob}
                    open={visibleEditor === "mob"}
                    onClose={stopEditing}
                    onChange={(mob) =>
                      dispatch(
                        slice.actions.updateMob({
                          id: mob.instanceId,
                          changes: mob,
                        })
                      )
                    }
                  />
                )}
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
