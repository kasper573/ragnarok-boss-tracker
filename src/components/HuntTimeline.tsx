import React from "react";
import MuiTimeline from "@material-ui/lab/Timeline";
import styled from "styled-components";
import { HuntTimelineItem, HuntTimelineItemProps } from "./HuntTimelineItem";
import { Hunt } from "../state/Hunt";

const Container = styled(MuiTimeline)`
  margin: 0;
  padding: 0;
`;

export type HuntTimelineProps = Pick<
  HuntTimelineItemProps,
  "onEditTombstoneLocation" | "onEditKillTime" | "onKillNow" | "onDelete"
> & {
  hunts: Hunt[];
};

export const HuntTimeline: React.FC<HuntTimelineProps> = ({
  hunts,
  ...itemProps
}) => (
  <Container align="alternate">
    {ordered(hunts).map((hunt, index) => (
      <HuntTimelineItem
        key={`hunt${index}`}
        hunt={hunt}
        alignActions={index % 2 !== 0 ? "right" : "left"}
        connector={index < hunts.length - 1}
        {...itemProps}
      />
    ))}
  </Container>
);

const ordered = (hunts: Hunt[]) =>
  hunts.slice().sort((a, b) => a.start.getTime() - b.start.getTime());
