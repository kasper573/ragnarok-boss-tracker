import React from "react";
import styled from "styled-components";
import { DropListItem } from "./DropListItem";
import { Drop } from "../state/Drop";
import { totalDropChance } from "../functions/totalDropChance";
import { Typography } from "@material-ui/core";

export type DropListGroupProps = {
  drops: Drop[];
};

export const DropListGroup: React.FC<DropListGroupProps> = ({ drops }) => {
  return (
    <Container>
      <div>
        {drops.map((drop, dropIndex) => (
          <DropListItem key={`drop${dropIndex}`} drop={drop} />
        ))}
      </div>
      {drops.length > 1 && (
        <Percentage>~{Math.round(totalDropChance(drops) * 100)}%</Percentage>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  & + & {
    margin-top: 12px;
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
