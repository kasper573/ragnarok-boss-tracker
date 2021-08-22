import React from "react";
import Typography from "@material-ui/core/Typography";
import { useTimer } from "../hooks/useTimer";
import { Hunt, useHuntWindow } from "../state/Hunt";
import { TimeText } from "./TimeText";

export type SpawnTimeProps = {
  hunt: Hunt;
};

export const SpawnTime: React.FC<SpawnTimeProps> = ({ hunt }) => {
  const [start, end] = useHuntWindow(hunt);
  const now = useTimer();
  // Spawn time is in the future
  if (start && now < start) {
    return (
      <Typography variant="body2" color="textSecondary">
        Spawn <TimeText time={start} color="success" />
      </Typography>
    );
  }

  // Spawn time is in the past
  if (end && now > end) {
    return (
      <Typography variant="body2" color="textSecondary">
        Spawn <TimeText time={end} color="error" />
      </Typography>
    );
  }

  // Spawn timing window is still open
  if (start && end) {
    return (
      <>
        <Typography variant="body2" color="textSecondary">
          Spawn <TimeText time={start} color="error" /> or{" "}
          <TimeText time={end} color="success" />
        </Typography>
      </>
    );
  }

  // Kill time not set
  return (
    <Typography variant="body2" color="textSecondary">
      Kill time not set
    </Typography>
  );
};
