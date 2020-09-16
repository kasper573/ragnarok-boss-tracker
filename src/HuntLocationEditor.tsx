import React from "react";
import { Dialog, DialogProps, DialogTitle } from "@material-ui/core";
import { Hunt } from "./Hunt";
import { MapLocation } from "./MapLocation";
import { MapView, Pin } from "./MapView";

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
  const setLocation = (location: MapLocation) => {
    // Don't allow changing fixed spawn locations
    if (!value.boss.fixedSpawnLocation) {
      onChange(value.update({ tombstoneLocation: location }))
    }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Tombstone location</DialogTitle>
      <MapLocationPicker
        imageUrl={value.map.imageUrl}
        value={value.tombstoneLocation}
        onChange={setLocation}
      />
    </Dialog>
  );
};

export type MapLocationPickerProps = {
  imageUrl: string;
  value?: MapLocation;
  onChange: (value: MapLocation) => void;
};

const MapLocationPicker: React.FC<MapLocationPickerProps> = ({
  imageUrl,
  value,
  onChange,
}) => {
  const emitLocation = (e: React.MouseEvent<HTMLDivElement>) => {
    const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
    onChange([(e.clientX - x) / width, (e.clientY - y) / height]);
  };
  return (
    <MapView
      style={{ backgroundImage: `url(${imageUrl})` }}
      onClick={emitLocation}
    >
      {value && <Pin x={value[0]} y={value[1]} />}
    </MapView>
  );
};
