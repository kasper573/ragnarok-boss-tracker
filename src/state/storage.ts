import { Hunt } from "./Hunt";
import { MapLocation } from "./MapLocation";
import { Boss } from "./Boss";
import { MapId } from "./MapId";
import { mapList } from "../fixtures/maps";
import { BossId } from "./BossId";

const storageId = "hunts";

export const saveToLocalStorage = (hunts: Hunt[]) => {
  const serialized: SerializedHunt[] = hunts.map((hunt) => ({
    bossId: hunt.boss.id,
    mapId: hunt.map.id,
    killTime: hunt.killTime.toUTCString(),
    tombstoneLocation: hunt.tombstoneLocation,
  }));
  localStorage.setItem(storageId, JSON.stringify(serialized));
};

export const loadFromLocalStorage = (bosses: Boss[]): Hunt[] => {
  const json = localStorage.getItem(storageId);
  if (!json) {
    return [];
  }
  try {
    const serialized: SerializedHunt[] = JSON.parse(json);
    const hunts: Hunt[] = [];
    for (const { bossId, mapId, killTime, tombstoneLocation } of serialized) {
      const boss = bosses.find(
        (candidate) => candidate.id === bossId && candidate.map.id === mapId
      );
      const map = mapList.find((map) => map.id === mapId);
      if (boss) {
        hunts.push(new Hunt(boss, map, new Date(killTime), tombstoneLocation));
      }
    }
    return hunts;
  } catch (e) {}
  return [];
};

type SerializedHunt = {
  bossId: BossId;
  killTime: string;
  mapId: MapId;
  tombstoneLocation: MapLocation | undefined;
};
