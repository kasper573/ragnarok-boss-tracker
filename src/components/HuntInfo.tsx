import Typography from "@material-ui/core/Typography";
import React from "react";
import { Hunt } from "../state/Hunt";
import { Tooltip, useMediaQuery, useTheme } from "@material-ui/core";
import { abbreviate } from "../functions/abbreviate";
import { getTierColor } from "../functions/getTierColor";
import { DropList } from "./DropList";

export type HuntInfoProps = { hunt: Hunt };

export const HuntInfo: React.FC<HuntInfoProps> = ({
  hunt: {
    map,
    boss: { name, spawnCooldown, spawnWindow, tier, drops },
  },
}) => {
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down("xs"));
  const titleColor = getTierColor(tier);
  const mvpDrops = drops ? drops.filter(({mvp}) => mvp) : [];
  const regularDrops = drops ? drops.filter(({mvp}) => !mvp) : [];
  return (
    <>
      {compact ? (
        <Tooltip title={name}>
          <Typography
            noWrap
            variant="h6"
            component="h1"
            style={{ color: titleColor }}
          >
            {abbreviate(name)}
          </Typography>
        </Tooltip>
      ) : (
        <Typography
          noWrap
          variant="h6"
          component="h1"
          style={{ color: titleColor }}
        >
          {name}
        </Typography>
      )}
      <Typography noWrap>
        {compact ? "" : "Cooldown: "}
        {spawnCooldown}~{spawnCooldown + spawnWindow}m
      </Typography>
      <Typography noWrap>
        {compact ? "" : "Map: "}
        {map.id}
      </Typography>
      {regularDrops.length > 0 && (
        <>
          <Typography variant="h6">Drops</Typography>
          <DropList drops={regularDrops} />
        </>
      )}
      {mvpDrops.length > 0 && (
        <>
          <Typography variant="h6">MVP Drops</Typography>
          <DropList drops={mvpDrops} />
        </>
      )}
    </>
  );
};
