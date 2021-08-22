import { Mob, MobInstanceId } from "./Mob";
import { MapLocation } from "./MapLocation";
import { useSelector } from "./store";
import { selectMob } from "./selectors";

export interface Hunt {
  id: MobInstanceId;
  killTime?: number;
  tombstoneLocation?: MapLocation;
}

export function huntStart(hunt: Hunt, mob?: Mob) {
  if (hunt.killTime && mob) {
    return new Date(hunt.killTime + mob.spawnCooldown * 60 * 1000);
  }
}

export function huntEnd(hunt: Hunt, mob?: Mob) {
  const start = huntStart(hunt, mob);
  if (start && mob) {
    return new Date(start.getTime() + mob.spawnWindow * 60 * 1000);
  }
}

export function huntWindow(hunt: Hunt, mob?: Mob) {
  return [huntStart(hunt, mob), huntEnd(hunt, mob)] as const;
}

export function useHuntWindow(hunt: Hunt) {
  const mob = useSelector(selectMob(hunt.id));
  return huntWindow(hunt, mob);
}
