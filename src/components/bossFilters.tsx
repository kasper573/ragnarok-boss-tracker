import React from "react";
import { getTierColor } from "../functions/getTierColor";
import { Boss } from "../state/Boss";
import { guildMaps } from "../fixtures/maps";
import { without } from "../functions/without";

export const bossFilterFns = {
  tier1: (boss: Boss) => boss.tier === 1,
  tier2: (boss: Boss) => boss.tier === 2,
  tier3: (boss: Boss) => boss.tier === 3,
  miniboss: (boss: Boss) => boss.tier === 0,
  guild: (boss: Boss) => guildMaps.includes(boss.map),
};

export const bossFilterLabelFns = {
  tier1: () => <span style={{ color: getTierColor(1) }}>Tier 1</span>,
  tier2: () => <span style={{ color: getTierColor(2) }}>Tier 2</span>,
  tier3: () => <span style={{ color: getTierColor(3) }}>Tier 3</span>,
  miniboss: () => <span style={{ color: getTierColor(0) }}>Miniboss</span>,
  guild: () => <span style={{ color: getTierColor(0) }}>Guild</span>,
};
export type BossFilter = keyof typeof bossFilterFns;

export const bossFilters: BossFilter[] = Object.keys(bossFilterFns) as any;

export const filterBosses = (bosses: Boss[], filters: BossFilter[]) => {
  if (!filters.length) {
    return bosses;
  }
  if (!filters.includes("guild")) {
    bosses = without(bosses, ...bosses.filter(bossFilterFns.guild));
    filters = without(filters, "guild");
  }
  return bosses.filter((boss) =>
    filters.find((filter) => bossFilterFns[filter](boss))
  );
};
