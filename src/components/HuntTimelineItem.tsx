import React from "react";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import MuiTimelineItem from "@material-ui/lab/TimelineItem";
import { SpawnTime } from "./SpawnTime";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import { Hunt } from "../state/Hunt";
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import { AccessTime, Delete, Room } from "@material-ui/icons";
import { HuntInfo } from "./HuntInfo";

export type HuntTimelineItemProps = {
  hunt: Hunt;
  onEditKillTime: (hunt: Hunt) => void;
  onEditTombstoneLocation: (hunt: Hunt) => void;
  onDelete: (hunt: Hunt) => void;
  alignActions: "right" | "left";
  connector: boolean;
};

export const HuntTimelineItem: React.FC<HuntTimelineItemProps> = ({
  hunt,
  onEditKillTime,
  onEditTombstoneLocation,
  onDelete,
  alignActions,
  connector,
}) => (
  <MuiTimelineItem>
    <TimelineOppositeContent>
      <SpawnTime hunt={hunt} />
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot>
        <Avatar src={hunt.boss.icon} />
      </TimelineDot>
      {connector && <TimelineConnector />}
    </TimelineSeparator>
    <TimelineContent>
      <PaddedPaper>
        <HuntInfo hunt={hunt} />
      </PaddedPaper>
      <Actions align={alignActions}>
        <Tooltip title="Set kill time">
          <IconButton onClick={() => onEditKillTime(hunt)}>
            <AccessTime />
          </IconButton>
        </Tooltip>
        {hunt.boss.tombstone ? (
          <Tooltip title="Tombstone location">
            <IconButton onClick={() => onEditTombstoneLocation(hunt)}>
              <Room />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Does not leave a tombstone">
            <span>
              <IconButton disabled>
                <Room />
              </IconButton>
            </span>
          </Tooltip>
        )}
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
