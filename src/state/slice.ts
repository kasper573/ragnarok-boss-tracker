import { createSlice } from "@reduxjs/toolkit";
import { mobs } from "../fixtures/mobs";
import { guildMaps, maps } from "../fixtures/maps";

const initialState = {
  mobs,
  maps,
  guildMaps,
};

export const slice = createSlice({
  name: "core",
  initialState,
  reducers: {},
});
