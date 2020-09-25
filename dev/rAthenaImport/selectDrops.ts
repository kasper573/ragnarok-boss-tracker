import { MobId } from "../../src/state/MobId";
import { ParsedDrop } from "./types/ParsedDrop";

export const selectDrops = (
  availableDrops: Map<MobId, ParsedDrop[]>,
  selectForMobIds: MobId[]
) =>
  selectForMobIds.reduce(
    (filteredDrops, mobId) =>
      filteredDrops.set(mobId, availableDrops.get(mobId) || []),
    new Map<MobId, ParsedDrop[]>()
  );
