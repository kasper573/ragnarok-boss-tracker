import { MobId } from "../../src/state/MobId";
import { ParsedDrop } from "./types/ParsedDrop";
import { ParsedItem } from "./types/ParsedItem";

export const selectItems = (
  availableItems: ParsedItem[],
  selectForDrops: Map<MobId, ParsedDrop[]>
): ParsedItem[] => {
  const referencedItems: ParsedItem[] = [];
  const dropLists = Array.from(selectForDrops.values());
  for (const drops of dropLists) {
    for (const drop of drops) {
      const item = availableItems.find((item) => item.id === drop.itemId);
      const existing = referencedItems.find((item) => item.id === drop.itemId);
      if (item && !existing) {
        referencedItems.push(item);
      }
    }
  }
  return referencedItems;
};
