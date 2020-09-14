import React from "react";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import Typography from "@material-ui/core/Typography";
import MuiTimelineItem from "@material-ui/lab/TimelineItem";
import { SpawnTime } from "./SpawnTime";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";

export const TimelineItem = () => (
  <MuiTimelineItem>
    <TimelineOppositeContent>
      <SpawnTime />
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot>
        <FastfoodIcon />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <TimelinePaper>
        <Typography variant="h6" component="h1">
          Tao Gunka
        </Typography>
        <Typography>Every 300~310 minutes on beach_dun</Typography>
      </TimelinePaper>
    </TimelineContent>
  </MuiTimelineItem>
);

const TimelinePaper = styled(Paper).attrs({ elevation: 3 })`
  padding: 6px 16px;
`;
