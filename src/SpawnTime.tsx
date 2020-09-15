import React from "react";
import Typography from "@material-ui/core/Typography";
import { format } from "timeago.js";
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
  const spawnTimestamp = killTime.getTime() + spawnTime * 1000;
  const start = new Date(spawnTimestamp);
  const end = new Date(spawnTimestamp + spawnWindow);

  return (
    <Typography variant="body2" color="textSecondary">
      {renderText(now, start, end)}
    </Typography>
  );
};

function renderText (now: Date, start: Date, end: Date) {
  if (now < start) {
    return format(start);
  }
  if (now > end) {
    return format(end);
  }
  return 'Spawning';
}

// TODO from <span>5 minutes ago</span> to <span>5 minutes</span> from now
