import React from "react";
import moment from "moment";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import { useTimer } from "./useTimer";
import { Hunt } from "./Hunt";

export type SpawnTimeProps = {
  hunt: Hunt;
};

export const SpawnTime: React.FC<SpawnTimeProps> = ({
  hunt: { start, end },
}) => {
  const now = useTimer();

  // Spawn time is in the future
  if (now < start) {
    return (
      <Typography variant="body2" color="textSecondary">
        Starting <FutureText>{format(start)}</FutureText>
      </Typography>
    );
  }

  // Spawn time is in the past
  if (now > end) {
    return (
      <Typography variant="body2" color="textSecondary">
        Ended <PastText>{format(end)}</PastText>
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
