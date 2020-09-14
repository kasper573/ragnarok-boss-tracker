import React from "react";
import Typography from "@material-ui/core/Typography";
import { Minutes } from "./Minutes";

export type SpawnTimeProps = {
  killTime: Date;
  spawnTime: Minutes;
  spawnWindow: Minutes;
};

export const SpawnTime: React.FC<SpawnTimeProps> = ({
  killTime,
  spawnTime,
}) => {
  const spawnDate = new Date(killTime.getDate() + spawnTime * 1000);
  return (
    <Typography variant="body2" color="textSecondary">
      {spawnDate.toLocaleDateString()}
    </Typography>
  );
};

// TODO from <span>5 minutes ago</span> to <span>5 minutes</span> from now
