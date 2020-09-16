import { Map } from "./Map";
import { Minutes } from "./Minutes";

export type Boss = {
  name: string;
  map: Map;
  spawnCooldown: Minutes;
  spawnWindow: Minutes;
};
