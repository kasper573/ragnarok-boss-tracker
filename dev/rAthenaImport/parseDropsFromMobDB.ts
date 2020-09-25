import { RAthenaMob } from "./RAthenaMob";
import { MobId } from "../../src/state/MobId";
import { ParsedDrop } from "./ParsedDrop";
import { ItemId } from "../../src/state/ItemId";
import { parseChance } from "./parseChance";
import { pull } from "./pull";

/**
 * Parses the data structure in rAthena database table mob_db
 */
export const parseDropsFromMobDB = (mobTableData: RAthenaMob[]) =>
  mobTableData.reduce((allDrops, mob) => {
    const mobId = parseInt(mob.ID, 10) as MobId;
    pushDrops(
      pull(allDrops, mobId, []),
      parseDrop(mob.MVP1id, mob.MVP1per, true),
      parseDrop(mob.MVP2id, mob.MVP2per, true),
      parseDrop(mob.MVP3id, mob.MVP3per, true),
      parseDrop(mob.MVP3id, mob.MVP3per, true),
      parseDrop(mob.Drop1id, mob.Drop1per),
      parseDrop(mob.Drop2id, mob.Drop2per),
      parseDrop(mob.Drop3id, mob.Drop3per),
      parseDrop(mob.Drop4id, mob.Drop4per),
      parseDrop(mob.Drop5id, mob.Drop5per),
      parseDrop(mob.Drop6id, mob.Drop6per),
      parseDrop(mob.Drop7id, mob.Drop7per),
      parseDrop(mob.Drop8id, mob.Drop8per),
      parseDrop(mob.Drop9id, mob.Drop9per),
      parseDrop(mob.DropCardid, mob.DropCardper)
    );
    return allDrops;
  }, new Map<MobId, ParsedDrop[]>());

const pushDrops = (existingDrops: ParsedDrop[], ...newDrops: ParsedDrop[]) =>
  // Omit null item drops
  existingDrops.push(...newDrops.filter((drop) => drop.item !== 0));

const parseDrop = (id: string, chance: string, mvp = false): ParsedDrop => ({
  item: parseInt(id, 10) as ItemId,
  chance: parseChance(chance),
  mvp,
});
