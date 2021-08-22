import { MapLocation } from "../state/MapLocation";
import React, { ComponentType, PropsWithChildren } from "react";
import { MapView } from "./MapView";
import { MapPinTombstone } from "./MapPin";

export type MapLocationPickerProps = PropsWithChildren<{
  imageUrl: string;
  value?: MapLocation;
  onChange: (value: MapLocation) => void;
  pin?: ComponentType<{ x: number; y: number }>;
}>;

export const MapLocationPicker: React.FC<MapLocationPickerProps> = ({
  imageUrl,
  value,
  onChange,
  children,
  pin: Pin = MapPinTombstone,
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
      {children}
    </MapView>
  );
};
