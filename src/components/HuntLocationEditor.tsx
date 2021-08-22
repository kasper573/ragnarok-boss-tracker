import React from "react";
import { Dialog, DialogProps, DialogTitle, Tooltip } from "@material-ui/core";
import { Hunt } from "../state/Hunt";
import { MapLocation } from "../state/MapLocation";
import { MapLocationPicker } from "./MapLocationPicker";
import { mapImageUrl } from "../functions/mapImageUrl";
import { MapPinSpawn } from "./MapPin";
import { useSelector } from "../state/store";
import { selectMob } from "../state/selectors";

export type HuntLocationEditorProps = Pick<DialogProps, "open" | "onClose"> & {
  value: Hunt;
  onChange: (newLocation: MapLocation) => void;
};

export const HuntLocationEditor: React.FC<HuntLocationEditorProps> = ({
  value: hunt,
  open,
  onChange,
  onClose,
}) => {
  const mob = useSelector(selectMob(hunt.id));
  if (!mob) {
    return null;
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Tombstone location</DialogTitle>
      <MapLocationPicker
        imageUrl={mapImageUrl(mob.mapId)}
        value={hunt.tombstoneLocation}
        onChange={onChange}
      >
        {mob?.spawnLocation && (
          <Tooltip title="Spawn location">
            <MapPinSpawn
              x={mob.spawnLocation[0]}
              y={mob.spawnLocation[1]}
              style={{ pointerEvents: "all" }}
            />
          </Tooltip>
        )}
      </MapLocationPicker>
    </Dialog>
  );
};
