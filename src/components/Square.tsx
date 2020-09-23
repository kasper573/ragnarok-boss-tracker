import * as React from "react";
import styled from "styled-components/macro";

export type SquareProps = React.HTMLAttributes<HTMLDivElement>;

export const Square = React.forwardRef<HTMLDivElement, SquareProps>(
  ({ children, ...props }, ref) => (
    <SquareBounds ref={ref} {...props}>
      <SquareContent>{children}</SquareContent>
    </SquareBounds>
  )
);

export const SquareBounds = styled.div`
  position: relative;
  &:after {
    padding-top: 100%;
    content: "";
    display: block;
  }
`;

export const SquareContent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
