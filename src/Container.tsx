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
const breakpoints = [768, 1024];
const mediaQueries = breakpoints.slice().reverse()
  .map(
    (bp) =>
      `@media screen and (min-width: ${bp}px) {width: ${bp - padding * 2}px;}`
  )
  .join();

const AlignAndPadding = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${padding}px;
`;

const FixedSizePaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  flex: 1;
  ${mediaQueries}
`;
