import React from "react";
import styled from "styled-components";
import { DropListItem } from "./DropListItem";
import { Drop } from "../state/Drop";
import { dropGroupPercentage } from "../functions/dropGroupPercentage";

export type DropListGroupProps = {
  drops: Drop[];
};

export const DropListGroup: React.FC<DropListGroupProps> = ({ drops }) => {
  return (
    <Container>
      <Items>
        {drops.map((drop, dropIndex) => (
          <DropListItem key={`drop${dropIndex}`} drop={drop} />
        ))}
      </Items>
      <Percentage>~{Math.round(dropGroupPercentage(drops) * 100)}%</Percentage>
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

const Items = styled.div`
  padding-right: 12px;
  margin-right: 12px;
  border-right: 3px solid white;
`;

const Percentage = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;
