import { Hunt } from "./Hunt";
import { MapLocation } from "./MapLocation";
import { Mob } from "./Mob";
import { MapId } from "./MapId";
import { MobId } from "./MobId";

const storageId = "hunts";

export const saveToLocalStorage = (hunts: Hunt[]) => {
  const serialized: SerializedHunt[] = hunts.map((hunt) => ({
    mobId: hunt.mob.id,
    mapId: hunt.mapId,
    killTime: hunt.killTime ? hunt.killTime.toUTCString() : undefined,
    tombstoneLocation: hunt.tombstoneLocation,
  }));
  localStorage.setItem(storageId, JSON.stringify(serialized));
};

export const loadFromLocalStorage = (mobs: Mob[], maps: MapId[]): Hunt[] => {
  const json = localStorage.getItem(storageId);
  if (!json) {
    return [];
  }
  try {
    const serialized: SerializedHunt[] = JSON.parse(json);
    const hunts: Hunt[] = [];
    for (const { mobId, mapId, killTime, tombstoneLocation } of serialized) {
      const mob = mobs.find(
        (candidate) => candidate.id === mobId && candidate.mapId === mapId
      );
      if (mob) {
        hunts.push(
          new Hunt(
            mob,
            maps.includes(mapId) ? mapId : undefined,
            killTime ? new Date(killTime) : undefined,
            tombstoneLocation
          )
        );
      }
    }
    return hunts;
  } catch (e) {}
  return [];
};

type SerializedHunt = {
  mobId: MobId;
  killTime?: string;
  mapId: MapId;
  tombstoneLocation: MapLocation | undefined;
};
