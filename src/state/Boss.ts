import { Map } from "./Map";
import { Minutes } from "./Minutes";
import { MapLocation } from "./MapLocation";
import { Tier } from "./Tier";
import { BossId } from "./BossId";

export type Boss = {
  id: BossId;
  icon?: string;
  name: string;
  map: Map;
  tier: Tier;
  spawnCooldown: Minutes;
  spawnWindow: Minutes;
  tombstone: boolean;
  spawnLocation?: MapLocation;
};
