import React from "react";
import { Drop } from "../state/Drop";
import { groupBy } from "../functions/groupBy";
import { DropListGroup } from "./DropListGroup";

export type DropListProps = {
  drops: Drop[];
};

export const DropList: React.FC<DropListProps> = ({ drops }) => {
  const groups: Drop[][] = Object.values(
    groupBy(drops, (drop) => drop.item.id)
  );
  return (
    <>
      {groups.map((group, groupIndex) => (
        <DropListGroup key={`group${groupIndex}`} drops={group} />
      ))}
    </>
  );
};
