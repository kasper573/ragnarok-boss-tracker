import { MapLocation } from "../state/MapLocation";
import React from "react";
import { MapView } from "./MapView";
import { MapPin } from "./MapPin";

export type MapLocationPickerProps = {
  imageUrl: string;
  value?: MapLocation;
  onChange: (value: MapLocation) => void;
};

export const MapLocationPicker: React.FC<MapLocationPickerProps> = ({
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
      {value && <MapPin x={value[0]} y={value[1]} />}
    </MapView>
  );
};
