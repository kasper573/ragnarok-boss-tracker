import { Map } from "./Map";
import { Minutes } from "./Minutes";
import { MapLocation } from "./MapLocation";
import { Tier } from "./Tier";
import { MobId } from "./MobId";
import { Drop } from "./Drop";

export type Mob = {
  id: MobId;
  icon?: string;
  name: string;
  map: Map;
  tier: Tier;
  spawnCooldown: Minutes;
  spawnWindow: Minutes;
  tombstone: boolean;
  spawnLocation?: MapLocation;
  drops?: Drop[];
};
