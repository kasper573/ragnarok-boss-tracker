import React from "react";
import styled from "styled-components";
import { DropListItem, spaceBetweenRows } from "./DropListItem";
import { Drop } from "../state/Drop";
import { totalChance } from "../functions/totalChance";
import { Typography } from "@material-ui/core";

export type DropListGroupProps = {
  drops: Drop[];
};

export const DropListGroup: React.FC<DropListGroupProps> = ({ drops }) => {
  const dropChances = drops.map((drop) => drop.chance);
  return (
    <Container>
      <div>
        {drops.map((drop, dropIndex) => (
          <DropListItem key={`drop${dropIndex}`} drop={drop} />
        ))}
      </div>
      {drops.length > 1 && (
        <Percentage>~{Math.round(totalChance(dropChances) * 100)}%</Percentage>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  & + & {
    margin-top: ${spaceBetweenRows};
  }
`;

const Percentage = styled(Typography)`
  display: flex;
  flex: 1;
  align-items: center;
  padding-left: 12px;
  margin-left: 12px;
  border-left: 3px solid white;
`;
