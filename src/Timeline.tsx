import React from "react";
import MuiTimeline from "@material-ui/lab/Timeline";
import styled from "styled-components";
import { TimelineItem } from "./TimelineItem";

const Container = styled(MuiTimeline)`
  margin: 0;
`;

export const Timeline = () => (
  <Container align="alternate">
    <TimelineItem />
    <TimelineItem />
    <TimelineItem />
    <TimelineItem />
  </Container>
);
