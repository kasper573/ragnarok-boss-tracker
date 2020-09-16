import { Map } from "./Map";
import { Minutes } from "./Minutes";

export type Boss = {
  icon: string;
  name: string;
  map: Map;
  spawnCooldown: Minutes;
  spawnWindow: Minutes;
};
