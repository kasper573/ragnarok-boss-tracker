import { blue, green, red } from "@material-ui/core/colors";
import { Tier } from "../state/Tier";

const tierColors = {
  0: undefined,
  1: green[500],
  2: blue[500],
  3: red[500],
};

export const getTierColor = (tier: Tier) => tierColors[tier];
