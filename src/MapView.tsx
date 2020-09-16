import styled from "styled-components";
import { Square } from "./Square";

export const MapView = styled(Square)(({theme}) => ({
  width: 310,
  backgroundSize: 'contain',
  backgroundPosition: '50% 50%',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    width: 500
  }
})) ;

export const Pin = styled.div<{ x: number; y: number }>`
  width: 32px;
  height: 32px;
  background-image: url(${require("./assets/tombstone.png")});
  background-size: contain;
  background-position: 50% 50%;
  position: absolute;
  left: ${({ x }) => `${x * 100}%`};
  top: ${({ y }) => `${y * 100}%`};
  transform: translate(-50%, -50%);
  pointer-events: none;
`;
