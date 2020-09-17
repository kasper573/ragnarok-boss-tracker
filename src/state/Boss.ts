import { Map } from "./Map";
import { Minutes } from "./Minutes";
import { MapLocation } from "./MapLocation";
import { Tier } from "./Tier";

export type Boss = {
  id: number;
  icon?: string;
  name: string;
  map: Map;
  tier: Tier;
  spawnCooldown: Minutes;
  spawnWindow: Minutes;
  tombstone: boolean;
  spawnLocation?: MapLocation;
};
