import { MobId } from "../../../src/state/MobId";
import { ParsedDrop } from "../types/ParsedDrop";
import { pull } from "../util/pull";
import { parseDrop } from "./parseDrop";
import { pushDrops } from "./pushDrops";

/**
 * Parses the data structure in rAthena data file mob_drop.txt
 */
export const parseDropsFromMobDrop = (
  allDrops: Map<MobId, ParsedDrop[]>,
  values: string[][]
) => {
  for (const [mobIdStr, itemIdStr, chanceStr, randOpt, flag] of values) {
    const mobId = parseInt(mobIdStr, 10) as MobId;
    const mobDrops = pull(allDrops, mobId, []);
    pushDrops(mobDrops, parseDrop(itemIdStr, chanceStr, flag === "2"));
  }
};
