import React from "react";
import moment from "moment";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import { Minutes } from "./Minutes";
import { useTimer } from "./useTimer";

export type SpawnTimeProps = {
  killTime: Date;
  spawnTime: Minutes;
  spawnWindow: Minutes;
};

export const SpawnTime: React.FC<SpawnTimeProps> = ({
  killTime,
  spawnTime,
  spawnWindow,
}) => {
  const now = useTimer();
  const spawnTimestamp = killTime.getTime() + spawnTime * 60 * 1000;
  const start = new Date(spawnTimestamp);
  const end = new Date(spawnTimestamp + spawnWindow * 60 * 1000);

  // Spawn time is in the future
  if (now < start) {
    return (
      <Typography variant="body2" color="textSecondary">
        Starting {format(start)}
      </Typography>
    );
  }

  // Spawn time is in the past
  if (now > end) {
    return (
      <Typography variant="body2" color="textSecondary">
        Ended {format(end)}
      </Typography>
    );
  }

  // Spawn timing window is still open
  return (
    <>
      <Typography variant="body2" color="textSecondary">
        Started <PastText>{format(start)}</PastText>
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Ends in <FutureText>{format(end)}</FutureText>
      </Typography>
    </>
  );
};

const format = (date: Date) => moment(date).fromNow();

const PastText = styled.span`
  color: ${({ theme }) => theme.palette.error.main};
`;

const FutureText = styled.span`
  color: ${({ theme }) => theme.palette.success.main};
`;
