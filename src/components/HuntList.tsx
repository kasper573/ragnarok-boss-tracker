import { Hunt } from "../state/Hunt";
import React from "react";
import { List } from "@material-ui/core";
import { HuntListItem, HuntListItemProps } from "./HuntListItem";

export type HuntListProps = Pick<
  HuntListItemProps,
  "onEditTombstoneLocation" | "onEditKillTime" | "onKillNow" | "onDelete"
> & {
  hunts: Hunt[];
};

export const HuntList: React.FC<HuntListProps> = ({ hunts, ...itemProps }) => (
  <List dense>
    {hunts.map((hunt, index) => (
      <HuntListItem key={`hunt${index}`} hunt={hunt} {...itemProps} />
    ))}
  </List>
);
