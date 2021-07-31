import React from "react";
import { getTierColor } from "../functions/getTierColor";
import { Mob } from "../state/Mob";
import { without } from "../functions/without";
import { AppState, useSelector } from "../state/store";
import { selectAll, selectGuildMaps } from "../state/selectors";

export type MobFilter = keyof typeof mobFilterFns;

export const mobFilterFns = {
  tier1: (mob: Mob) => mob.tier === 1,
  tier2: (mob: Mob) => mob.tier === 2,
  tier3: (mob: Mob) => mob.tier === 3,
  miniboss: (mob: Mob) => mob.tier === 0,
  guild: (mob: Mob, state: AppState) =>
    selectGuildMaps(state).includes(mob.mapId),
};

export const mobFilters: MobFilter[] = Object.keys(mobFilterFns) as any;

export const mobFilterLabelFns = {
  tier1: () => <span style={{ color: getTierColor(1) }}>Tier 1</span>,
  tier2: () => <span style={{ color: getTierColor(2) }}>Tier 2</span>,
  tier3: () => <span style={{ color: getTierColor(3) }}>Tier 3</span>,
  miniboss: () => <span style={{ color: getTierColor(0) }}>Miniboss</span>,
  guild: () => <span style={{ color: getTierColor(0) }}>Guild</span>,
};

export const useMobFilters = (mobs: Mob[], filters: MobFilter[]) => {
  const state = useSelector(selectAll);
  if (!filters.length) {
    return mobs;
  }
  if (!filters.includes("guild")) {
    mobs = without(
      mobs,
      ...mobs.filter((mob) => mobFilterFns.guild(mob, state))
    );
    filters = without(filters, "guild");
  }
  return mobs.filter((mob) =>
    filters.find((filter) => mobFilterFns[filter](mob, state))
  );
};
