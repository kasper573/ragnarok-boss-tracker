import { Minutes } from "./Minutes";
import { MapLocation } from "./MapLocation";
import { Tier } from "./Tier";
import { MobId } from "./MobId";
import { Drop } from "./Drop";
import { MapId } from "./MapId";

export type Mob = {
  id: MobId;
  name: string;
  mapId: MapId;
  tier: Tier;
  spawnCooldown: Minutes;
  spawnWindow: Minutes;
  tombstone: boolean;
  spawnLocation?: MapLocation;
  drops?: Drop[];
};
