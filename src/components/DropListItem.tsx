import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { Drop } from "../state/Drop";
import { formatDropChance } from "../functions/formatDropChance";
import { assetUrl } from "../functions/assetUrl";

export type DropListItemProps = { drop: Drop };

export const DropListItem: React.FC<DropListItemProps> = ({ drop }) => {
  return (
    <DropListItemRow>
      {drop.item.iconPath && (
        <DropListItemIcon src={assetUrl(drop.item.iconPath)} />
      )}
      <Typography>
        {drop.item.name} ({formatDropChance(drop.chance * 100)})
      </Typography>
    </DropListItemRow>
  );
};

export const spaceBetweenRows = "8px";

const DropListItemRow = styled.div`
  display: flex;
  & + & {
    margin-top: ${spaceBetweenRows};
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
