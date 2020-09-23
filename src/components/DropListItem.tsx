import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { Drop } from "../state/Drop";

export type DropListItemProps = { drop: Drop };

export const DropListItem: React.FC<DropListItemProps> = ({ drop }) => {
  return (
    <DropListItemRow>
      <DropListItemIcon src={drop.item.icon} />
      <Typography>
        {drop.item.name} ({Math.round(drop.chance * 100)}%)
      </Typography>
    </DropListItemRow>
  );
};

const DropListItemRow = styled.div`
  display: flex;
  & + & {
    margin-top: 8px;    
  }
`;

const DropListItemIcon = styled.div<{ src: string }>`
  width: 24px;
  height: 24px;
  margin-right: 12px;
  background-image: url(${({ src }) => src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;
