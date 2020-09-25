import React from "react";
import { SpawnTime } from "./SpawnTime";
import { Hunt } from "../state/Hunt";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { AlarmOn, Delete, MoreVert, Room, Update } from "@material-ui/icons";
import { HuntInfo } from "./HuntInfo";
import styled from "styled-components";
import { getTierColor } from "../functions/getTierColor";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";

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
        <Tooltip title={<HuntInfo hunt={hunt} />}>
          {hunt.mob.icon ? <MobIcon src={hunt.mob.icon} /> : <Avatar />}
        </Tooltip>
      </ListItemAvatar>
      <ListItemText
        primary={hunt.mob.name}
        primaryTypographyProps={{
          style: { color: getTierColor(hunt.mob.tier) },
        }}
        secondary={<SpawnTime hunt={hunt} />}
        secondaryTypographyProps={{ component: "span" }}
      />
      <ListItemSecondaryAction>
        <Tooltip title="Kill now">
          <IconButton size={buttonSize} onClick={() => onKillNow(hunt)}>
            <AlarmOn />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={
            hunt.mob.tombstone
              ? "Tombstone location"
              : "Does not leave a tombstone"
          }
        >
          <span>
            <IconButton
              size={buttonSize}
              onClick={() => onEditTombstoneLocation(hunt)}
              disabled={!hunt.mob.tombstone}
            >
              <Room />
            </IconButton>
          </span>
        </Tooltip>
        <PopupState variant="popover">
          {(popupState) => (
            <>
              <IconButton
                edge="end"
                size={buttonSize}
                {...bindTrigger(popupState)}
              >
                <MoreVert />
              </IconButton>
              <Menu {...bindMenu(popupState)}>
                <MenuItem
                  onClick={() => {
                    onEditKillTime(hunt);
                    popupState.close();
                  }}
                >
                  <ListItemIcon>
                    <Update fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">Edit kill time</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onDelete(hunt);
                    popupState.close();
                  }}
                >
                  <ListItemIcon>
                    <Delete fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">Stop hunting</Typography>
                </MenuItem>
              </Menu>
            </>
          )}
        </PopupState>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const MobIcon = styled.div<{ src: string }>`
  background-image: url(${({ src }) => src});
  background-size: contain;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
`;
