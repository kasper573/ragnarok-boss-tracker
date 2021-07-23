import React from "react";
import { Dialog, DialogProps, DialogTitle } from "@material-ui/core";
import { Hunt } from "../state/Hunt";
import { MapLocation } from "../state/MapLocation";
import { MapLocationPicker } from "./MapLocationPicker";
import { mapImageUrl } from "../functions/mapImageUrl";

export type HuntLocationEditorProps = Pick<DialogProps, "open" | "onClose"> & {
  value: Hunt;
  onChange: (value: Hunt) => void;
};

export const HuntLocationEditor: React.FC<HuntLocationEditorProps> = ({
  value,
  open,
  onChange,
  onClose,
}) => {
  const setLocation = (location: MapLocation) =>
    onChange(value.update({ tombstoneLocation: location }));
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Tombstone location</DialogTitle>
      <MapLocationPicker
        imageUrl={mapImageUrl(value.mapId)}
        value={value.tombstoneLocation}
        onChange={setLocation}
      />
    </Dialog>
  );
};
