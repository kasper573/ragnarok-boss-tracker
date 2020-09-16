import React from "react";
import MuiTimeline from "@material-ui/lab/Timeline";
import styled from "styled-components";
import { HuntTimelineItem } from "./HuntTimelineItem";
import { Hunt } from "./Hunt";

const Container = styled(MuiTimeline)`
  margin: 0;
`;

export type HuntTimelineProps = {
  hunts: Hunt[];
  onEdit: (hunt: Hunt) => void;
  onDelete: (hunt: Hunt) => void;
};

export const HuntTimeline: React.FC<HuntTimelineProps> = ({
  hunts,
  onDelete,
  onEdit,
}) => (
  <Container align="alternate">
    {ordered(hunts).map((hunt, index) => (
      <HuntTimelineItem
        key={`hunt${index}`}
        onEdit={onEdit}
        onDelete={onDelete}
        hunt={hunt}
        reverse={index % 2 !== 0}
      />
    ))}
  </Container>
);

const ordered = (hunts: Hunt[]) =>
  hunts.slice().sort((a, b) => a.start.getTime() - b.start.getTime());
