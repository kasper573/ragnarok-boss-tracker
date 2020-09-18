import React from "react";
import { SpawnTime } from "./SpawnTime";
import { Hunt } from "../state/Hunt";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { AlarmOn, Delete, Info, Room, Update } from "@material-ui/icons";
import { HuntInfo } from "./HuntInfo";
import styled from "styled-components";
import { getTierColor } from "../functions/getTierColor";

export type HuntListItemProps = {
  hunt: Hunt;
  onEditKillTime: (hunt: Hunt) => void;
  onEditTombstoneLocation: (hunt: Hunt) => void;
  onKillNow: (hunt: Hunt) => void;
  onDelete: (hunt: Hunt) => void;
};

export const HuntListItem: React.FC<HuntListItemProps> = ({
  hunt,
  onEditKillTime,
  onEditTombstoneLocation,
  onKillNow,
  onDelete,
}) => {
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down("xs"));
  const buttonSize = compact ? "small" : "medium";

  return (
    <ListItem>
      <ListItemAvatar>
        {hunt.boss.icon ? <BossIcon src={hunt.boss.icon} /> : <Avatar />}
      </ListItemAvatar>
      <ListItemText
        primary={hunt.boss.name}
        primaryTypographyProps={{
          style: { color: getTierColor(hunt.boss.tier) },
        }}
        secondary={<SpawnTime hunt={hunt} />}
        secondaryTypographyProps={{ component: "span" }}
      />
      <ListItemSecondaryAction>
        <Tooltip title={<HuntInfo hunt={hunt} />}>
          <IconButton>
            <Info />
          </IconButton>
        </Tooltip>
        <Tooltip title="Set kill time">
          <IconButton size={buttonSize} onClick={() => onEditKillTime(hunt)}>
            <Update />
          </IconButton>
        </Tooltip>
        <Tooltip title="Kill now">
          <IconButton size={buttonSize} onClick={() => onKillNow(hunt)}>
            <AlarmOn />
          </IconButton>
        </Tooltip>
        {hunt.boss.tombstone ? (
          <Tooltip title="Tombstone location">
            <IconButton
              size={buttonSize}
              onClick={() => onEditTombstoneLocation(hunt)}
            >
              <Room />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Does not leave a tombstone">
            <span>
              <IconButton size={buttonSize} disabled>
                <Room />
              </IconButton>
            </span>
          </Tooltip>
        )}
        <Tooltip title="Stop hunting">
          <IconButton size={buttonSize} onClick={() => onDelete(hunt)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const BossIcon = styled.div<{ src: string }>`
  background-image: url(${({ src }) => src});
  background-size: contain;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
`;
