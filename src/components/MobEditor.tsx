import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { Mob } from "../state/Mob";
import { MapId } from "../state/MapId";
import { Tier, tierList } from "../state/Tier";
import { Minutes } from "../state/Minutes";
import styled from "styled-components/macro";
import { Info, Room, RotateLeft } from "@material-ui/icons";
import { MapLocationPicker } from "./MapLocationPicker";
import { mapImageUrl } from "../functions/mapImageUrl";
import { MapPinSpawn } from "./MapPin";
import { useSelector } from "../state/store";
import { selectMaps } from "../state/selectors";
import { mobs as defaultMobs } from "../fixtures/mobs";

export type MobEditorProps = Pick<DialogProps, "open" | "onClose"> & {
  value: Mob;
  onChange: (value: Mob) => void;
};

export const MobEditor = ({
  value: mob,
  open,
  onChange,
  onClose,
}: MobEditorProps) => {
  const maps = useSelector(selectMaps);
  const [isEditingSpawnLocation, setEditingSpawnLocation] = useState(false);
  const defaultMob = defaultMobs.find(
    (candidate) => candidate.instanceId === mob.instanceId
  );

  function setPropertyValue<K extends keyof Mob>(key: K, value: Mob[K]) {
    onChange({ ...mob, [key]: value });
  }
  function restoreDefaults() {
    if (defaultMob) {
      onChange(defaultMob);
    }
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DockTopRight>
        <Tooltip title="Restore defaults">
          <IconButton onClick={restoreDefaults}>
            <RotateLeft />
          </IconButton>
        </Tooltip>
      </DockTopRight>
      <DialogTitle>Edit monster info</DialogTitle>
      <Content>
        <Grid container spacing={4}>
          <Grid item>
            <TextField
              label="Name"
              value={mob.name}
              onChange={(e) => setPropertyValue("name", e.target.value)}
            />
            <FormControl>
              <InputLabel shrink>Map</InputLabel>
              <Select
                value={mob.mapId}
                onChange={(e) =>
                  setPropertyValue("mapId", e.target.value as MapId)
                }
              >
                {maps.map((mapId) => (
                  <MenuItem value={mapId} key={mapId}>
                    {mapId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel shrink>Tier</InputLabel>
              <Select
                value={mob.tier}
                onChange={(e) =>
                  setPropertyValue(
                    "tier",
                    parseInt(`${e.target.value}`, 10) as Tier
                  )
                }
              >
                {tierList.map((tier) => (
                  <MenuItem value={tier} key={tier}>
                    {tier}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              label={
                <LabelWithInfo
                  label="Spawn cooldown"
                  info="How many minutes you have to wait after killing the monster before it is able to spawn again"
                />
              }
              value={mob.spawnCooldown}
              type="number"
              onChange={(e) =>
                setPropertyValue(
                  "spawnCooldown",
                  Math.max(0, parseInt(e.target.value, 10) || 0) as Minutes
                )
              }
            />
            <TextField
              label={
                <LabelWithInfo
                  label="Spawn window"
                  info="How many minutes may have to wait after the cooldown before the monster spawns."
                />
              }
              value={mob.spawnWindow}
              type="number"
              onChange={(e) =>
                setPropertyValue(
                  "spawnWindow",
                  Math.max(0, parseInt(e.target.value, 10) || 0) as Minutes
                )
              }
            />
            <FormControl>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>Spawn location</Grid>
                <Grid item>
                  <Tooltip title="Change spawn location">
                    <span>
                      <IconButton onClick={() => setEditingSpawnLocation(true)}>
                        <Room />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Grid>
              </Grid>
            </FormControl>
            <FormControl>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>Has tombstone</Grid>
                <Grid item>
                  <Switch
                    checked={mob.tombstone}
                    onChange={(e) =>
                      setPropertyValue("tombstone", e.target.checked)
                    }
                  />
                </Grid>
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </Content>
      <Dialog
        open={isEditingSpawnLocation}
        onClose={() => setEditingSpawnLocation(false)}
      >
        <DialogTitle>Spawn location</DialogTitle>
        <MapLocationPicker
          imageUrl={mapImageUrl(mob.mapId)}
          value={mob.spawnLocation}
          onChange={(location) => setPropertyValue("spawnLocation", location)}
          pin={MapPinSpawn}
        />
      </Dialog>
    </Dialog>
  );
};

const LabelWithInfo = ({ label, info }: { label: string; info: string }) => (
  <Grid container alignItems="center" spacing={1}>
    <Grid item>
      <Oneliner>{label}</Oneliner>
    </Grid>
    <Grid item>
      <Tooltip title={info}>
        <Info />
      </Tooltip>
    </Grid>
  </Grid>
);

const Content = styled(DialogContent)`
  padding-top: 0;
  padding-bottom: ${({ theme }) => theme.spacing(3)}px;
  .MuiFormControl-root {
    display: block;
    &:not(:first-child) {
      margin-top: ${({ theme }) => theme.spacing(2)}px;
    }
  }
`;

const Oneliner = styled.span`
  white-space: nowrap;
`;

const DockTopRight = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing(1)}px;
  right: ${({ theme }) => theme.spacing(1)}px;
`;
