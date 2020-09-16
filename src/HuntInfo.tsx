import Typography from "@material-ui/core/Typography";
import React from "react";
import { Hunt } from "./Hunt";
import { Tooltip, useMediaQuery, useTheme } from "@material-ui/core";

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

function abbreviate(str: string) {
  const words = str.split(/\s+/);
  switch (words.length) {
    case 1:
      return str;
    case 2:
      return `${words[0]} ${words[1][0].toUpperCase()}`;
    default:
      return words
        .map((word) => word[0])
        .join("")
        .toUpperCase();
  }
}
