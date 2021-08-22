import Typography from "@material-ui/core/Typography";
import React from "react";
import { Hunt } from "../state/Hunt";
import { Tooltip, useMediaQuery, useTheme } from "@material-ui/core";
import { abbreviate } from "../functions/abbreviate";
import { getTierColor } from "../functions/getTierColor";
import { DropList } from "./DropList";
import { useSelector } from "../state/store";
import { selectMob } from "../state/selectors";

export type HuntInfoProps = { hunt: Hunt };

export const HuntInfo: React.FC<HuntInfoProps> = ({ hunt }) => {
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down("xs"));
  const mob = useSelector(selectMob(hunt.id));
  if (!mob) {
    return null;
  }
  const { name, spawnCooldown, spawnWindow, tier, drops } = mob;
  const titleColor = getTierColor(tier);
  const mvpDrops = drops ? drops.filter(({ mvp }) => mvp) : [];
  const regularDrops = drops ? drops.filter(({ mvp }) => !mvp) : [];
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
        {mob.mapId}
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
