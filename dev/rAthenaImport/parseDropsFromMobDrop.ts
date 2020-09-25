import { MobId } from "../../src/state/MobId";
import { ParsedDrop } from "./ParsedDrop";
import { ItemId } from "../../src/state/ItemId";
import { parseChance } from "./parseChance";
import { pull } from "./pull";

/**
 * Parses the data structure in rAthena data file mob_drop.txt
 */
export const parseDropsFromMobDrop = (
  allDrops: Map<MobId, ParsedDrop[]>,
  values: string[][]
) => {
  for (const [mobIdStr, itemIdStr, chanceStr, randOpt, flag] of values) {
    const mobId = parseInt(mobIdStr, 10) as MobId;
    const itemId = parseInt(itemIdStr, 10) as ItemId;
    const mvp = flag === "2";
    const mobDrops = pull(allDrops, mobId, []);
    mobDrops.push({ mvp, item: itemId, chance: parseChance(chanceStr) });
  }
};
