import { AppState } from "./store";

export const selectAll = (state: AppState) => state;

export const selectMobs = (state: AppState) => state.mobs;

export const selectMaps = (state: AppState) => state.maps;

export const selectGuildMaps = (state: AppState) => state.guildMaps;
