import { AppState } from "./store";
import { Mob, MobInstanceId } from "./Mob";
import { Hunt } from "./Hunt";

export const selectAll = (state: AppState) => state;

export const selectHunts = (state: AppState) =>
  Object.values(state.hunts.entities).filter(
    (hunt): hunt is Hunt => hunt !== undefined
  );

export const selectHunt = (id?: MobInstanceId) => (state: AppState) =>
  id !== undefined ? state.hunts.entities[id] : undefined;

export const selectMobs = (state: AppState) =>
  Object.values(state.mobs.entities).filter(
    (mob): mob is Mob => mob !== undefined
  );

export const selectMobDictionary = (state: AppState) => state.mobs.entities;

export const selectMob = (id?: MobInstanceId) => (state: AppState) =>
  id !== undefined ? state.mobs.entities[id] : undefined;

export const selectMaps = (state: AppState) => state.maps;

export const selectGuildMaps = (state: AppState) => state.guildMaps;
