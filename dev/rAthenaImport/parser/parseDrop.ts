import { ParsedDrop } from "../types/ParsedDrop";
import { ItemId } from "../../../src/state/ItemId";
import { parseChance } from "./parseChance";

export const parseDrop = (
  itemId: string,
  chance: string,
  mvp = false
): ParsedDrop => ({
  item: parseInt(itemId, 10) as ItemId,
  chance: parseChance(chance),
  mvp,
});
