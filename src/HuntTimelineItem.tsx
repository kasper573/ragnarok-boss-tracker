import React from "react";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import MuiTimelineItem from "@material-ui/lab/TimelineItem";
import { SpawnTime } from "./SpawnTime";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import { Hunt } from "./Hunt";
import { IconButton, Tooltip } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { HuntInfo } from "./HuntInfo";

export type HuntTimelineItemProps = {
  hunt: Hunt;
  onEdit: (hunt: Hunt) => void;
  onDelete: (hunt: Hunt) => void;
  reverse?: boolean;
};

export const HuntTimelineItem: React.FC<HuntTimelineItemProps> = ({
  hunt,
  onEdit,
  onDelete,
  reverse,
}) => (
  <MuiTimelineItem>
    <TimelineOppositeContent>
      <SpawnTime hunt={hunt} />
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot>
        <FastfoodIcon />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <PaddedPaper>
        <HuntInfo hunt={hunt} />
      </PaddedPaper>
      <Actions align={reverse ? "right" : "left"}>
        <Tooltip title="Set kill time">
          <IconButton onClick={() => onEdit(hunt)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Stop hunting">
          <IconButton onClick={() => onDelete(hunt)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Actions>
    </TimelineContent>
  </MuiTimelineItem>
);

const PaddedPaper = styled(Paper).attrs({ elevation: 3 })`
  padding: 6px 16px;
`;

const Actions = styled.div<{ align: "left" | "right" }>`
  text-align: ${({ align }) => align};
  margin-top: 8px;
`;
