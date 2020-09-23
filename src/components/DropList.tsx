import React from "react";
import { Drop } from "../state/Drop";

export type DropListProps = {
  drops: Drop[];
};

export const DropList: React.FC<DropListProps> = () => <span>Drop List</span>;
