import styled from "styled-components";
import { assetUrl } from "../functions/assetUrl";

export const MapPin = styled.div<{ x: number; y: number }>`
  width: 32px;
  height: 32px;
  background-image: url(${assetUrl("tombstone.png")});
  background-size: contain;
  background-position: 50% 50%;
  position: absolute;
  left: ${({ x }) => `${x * 100}%`};
  top: ${({ y }) => `${y * 100}%`};
  transform: translate(-50%, -50%);
  pointer-events: none;
`;
