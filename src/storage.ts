import { Hunt } from "./Hunt";
import { MapLocation } from "./MapLocation";
import { Boss } from "./Boss";
import { Map } from "./Map";

const storageId = "hunts";

export const saveToLocalStorage = (hunts: Hunt[]) => {
  const serialized: SerializedHunt[] = hunts.map((hunt) => ({
    bossId: hunt.boss.id,
    map: hunt.map,
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
    for (const { bossId, map, killTime, tombstoneLocation } of serialized) {
      const boss = bosses.find((candidate) => candidate.id === bossId);
      if (boss) {
        hunts.push(new Hunt(boss, map, new Date(killTime), tombstoneLocation));
      }
    }
    return hunts;
  } catch (e) {}
  return [];
};

type SerializedHunt = {
  bossId: number;
  killTime: string;
  map: Map;
  tombstoneLocation: MapLocation | undefined;
};
