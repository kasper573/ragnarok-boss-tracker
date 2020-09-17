import React from "react";
import Typography from "@material-ui/core/Typography";
import { useTimer } from "../hooks/useTimer";
import { Hunt } from "../state/Hunt";
import { TimeText } from "./TimeText";

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
        Can spawn <TimeText time={start} color="success" />
      </Typography>
    );
  }

  // Spawn time is in the past
  if (now > end) {
    return (
      <Typography variant="body2" color="textSecondary">
        Spawned <TimeText time={end} color="error" />
      </Typography>
    );
  }

  // Spawn timing window is still open
  return (
    <>
      <Typography variant="body2" color="textSecondary">
        Could spawn <TimeText time={start} color="error" /> or{" "}
        <TimeText time={end} color="success" />
      </Typography>
    </>
  );
};
