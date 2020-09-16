import styled from "styled-components";
import { Square } from "./Square";

export const MapView = styled(Square)(({ theme }) => ({
  width: 310,
  backgroundSize: "contain",
  backgroundPosition: "50% 50%",
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.up("md")]: {
    width: 500,
  },
}));
