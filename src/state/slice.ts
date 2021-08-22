import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
  Update,
} from "@reduxjs/toolkit";
import { mobs } from "../fixtures/mobs";
import { guildMaps, maps } from "../fixtures/maps";
import { Hunt } from "./Hunt";
import { Mob, MobInstanceId } from "./Mob";
import { MapLocation } from "./MapLocation";

const huntAdapter = createEntityAdapter<Hunt>({ selectId: (hunt) => hunt.id });
const mobAdapter = createEntityAdapter<Mob>({
  selectId: (mob) => mob.instanceId,
});

export const createInitialState = () =>
  Object.freeze({
    maps,
    guildMaps,
    mobs: mobAdapter.addMany(mobAdapter.getInitialState(), mobs),
    hunts: huntAdapter.getInitialState(),
  });

export const slice = createSlice({
  name: "core",
  initialState: createInitialState(),
  reducers: {
    setKillTime(
      state,
      {
        payload: { id, killTime },
      }: PayloadAction<{ id: MobInstanceId; killTime: number }>
    ) {
      huntAdapter.updateOne(state.hunts, {
        id,
        changes: {
          killTime,
        },
      });
    },
    setTombstoneLocation(
      state,
      {
        payload: { id, tombstoneLocation },
      }: PayloadAction<{ id: MobInstanceId; tombstoneLocation: MapLocation }>
    ) {
      huntAdapter.updateOne(state.hunts, {
        id,
        changes: {
          tombstoneLocation,
        },
      });
    },
    hunt(state, { payload: id }: PayloadAction<MobInstanceId>) {
      const hunt = state.hunts.entities[id];
      if (!hunt) {
        huntAdapter.addOne(state.hunts, { id });
      }
    },
    stopHunting(state, { payload: id }: PayloadAction<MobInstanceId>) {
      huntAdapter.removeOne(state.hunts, id);
    },
    updateMob(state, { payload }: PayloadAction<Update<Mob>>) {
      mobAdapter.updateOne(state.mobs, payload);
    },
  },
});
