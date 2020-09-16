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
import {
  Avatar,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { AlarmOn, Delete, Room, Update } from "@material-ui/icons";
import { HuntInfo } from "./HuntInfo";
import Typography from "@material-ui/core/Typography";
import { TimeText } from "./TimeText";

export type HuntTimelineItemProps = {
  hunt: Hunt;
  onEditKillTime: (hunt: Hunt) => void;
  onEditTombstoneLocation: (hunt: Hunt) => void;
  onKillNow: (hunt: Hunt) => void;
  onDelete: (hunt: Hunt) => void;
  alignActions: "right" | "left";
  connector: boolean;
};

export const HuntTimelineItem: React.FC<HuntTimelineItemProps> = ({
  hunt,
  onEditKillTime,
  onEditTombstoneLocation,
  onKillNow,
  onDelete,
  alignActions,
  connector,
}) => {
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down("xs"));
  const buttonSize = compact ? "small" : "medium";

  return (
    <MuiTimelineItem>
      <TimelineOppositeContent>
        <Typography variant="body2" color="textSecondary">
          Killed <TimeText time={hunt.killTime} color="error" />
        </Typography>
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
            <IconButton size={buttonSize} onClick={() => onEditKillTime(hunt)}>
              <Update />
            </IconButton>
          </Tooltip>
          <Tooltip title="Kill now">
            <IconButton size={buttonSize} onClick={() => onKillNow(hunt)}>
              <AlarmOn />
            </IconButton>
          </Tooltip>
          {hunt.boss.tombstone ? (
            <Tooltip title="Tombstone location">
              <IconButton
                size={buttonSize}
                onClick={() => onEditTombstoneLocation(hunt)}
              >
                <Room />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Does not leave a tombstone">
              <span>
                <IconButton size={buttonSize} disabled>
                  <Room />
                </IconButton>
              </span>
            </Tooltip>
          )}
          <Tooltip title="Stop hunting">
            <IconButton size={buttonSize} onClick={() => onDelete(hunt)}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Actions>
      </TimelineContent>
    </MuiTimelineItem>
  );
};

const PaddedPaper = styled(Paper).attrs({ elevation: 3 })`
  padding: 6px 16px;
`;

const Actions = styled.div<{ align: "left" | "right" }>`
  text-align: ${({ align }) => align};
  margin-top: 8px;
`;
