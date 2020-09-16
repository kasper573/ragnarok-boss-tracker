import React from "react";
import styled from "styled-components";
import { Paper } from "@material-ui/core";

/**
 * The primary content container for everything shown on the web page.
 * Centers content horizontally and wraps everything in a fixed size Paper.
 */
export const Container: React.FC = ({ children }) => (
  <AlignAndPadding>
    <FixedSizePaper>{children}</FixedSizePaper>
  </AlignAndPadding>
);

const padding = 30;

const AlignAndPadding = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${padding}px;
`;

const FixedSizePaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  [theme.breakpoints.up("sm")]: {
    width: '100%',
  },
  [theme.breakpoints.up("md")]: {
    width: theme.breakpoints.values.md - padding * 2,
  },
}));
