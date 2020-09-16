import React from "react";
import styled from "styled-components";

/**
 * The primary content container for everything shown on the web page.
 * Centers content horizontally and maintains a responsive content size.
 */
export const Container: React.FC = ({ children }) => (
  <AlignAndPadding>
    <FixedSize>{children}</FixedSize>
  </AlignAndPadding>
);

const padding = 30;

const AlignAndPadding = styled.div(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: padding,
  [theme.breakpoints.down("xs")]: {
    padding: 0,
  },
}));

const FixedSize = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: theme.breakpoints.values.md - padding * 2,
  },
}));
