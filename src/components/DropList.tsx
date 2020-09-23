import React from "react";
import { Drop } from "../state/Drop";
import { DropListItem } from "./DropListItem";

export type DropListProps = {
  drops: Drop[];
};

export const DropList: React.FC<DropListProps> = ({ drops }) => (
  <>
    {drops.map((drop, index) => (
      <DropListItem key={`drop${index}`} drop={drop} />
    ))}
  </>
);
