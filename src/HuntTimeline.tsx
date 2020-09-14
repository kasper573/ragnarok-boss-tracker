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
};

export const HuntTimeline: React.FC<HuntTimelineProps> = ({ hunts }) => (
  <Container align="alternate">
    {hunts.map((hunt, index) => (
      <HuntTimelineItem key={`hunt${index}`} {...hunt} />
    ))}
  </Container>
);
