import Typography from "@material-ui/core/Typography";
import React from "react";
import { Hunt } from "../state/Hunt";
import { Tooltip, useMediaQuery, useTheme } from "@material-ui/core";
import { abbreviate } from "../functions/abbreviate";

export type HuntInfoProps = { hunt: Hunt };

export const HuntInfo: React.FC<HuntInfoProps> = ({
  hunt: {
    map,
    boss: { name, spawnCooldown, spawnWindow },
  },
}) => {
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <>
      {compact ? (
        <Tooltip title={name}>
          <Typography noWrap variant="h6" component="h1">
            {abbreviate(name)}
          </Typography>
        </Tooltip>
      ) : (
        <Typography noWrap variant="h6" component="h1">
          {name}
        </Typography>
      )}
      <Typography noWrap>
        {compact ? "" : "Cooldown: "}
        {spawnCooldown}~{spawnCooldown + spawnWindow}m
      </Typography>
      <Typography noWrap>
        {compact ? "" : "Map: "}
        {map.name}
      </Typography>
    </>
  );
};
