import { RAthenaItem } from "../types/RAthenaItem";
import { ParsedItem } from "../types/ParsedItem";
import { ItemId } from "../../../src/state/ItemId";

/**
 * Parses the data structure in rAthena database table item_db
 */
export const parseItemsFromItemDB = (
  itemTableData: RAthenaItem[]
): ParsedItem[] =>
  itemTableData.map(({ id, name_japanese, type }) => ({
    id: parseInt(id, 10) as ItemId,
    name: name_japanese,
    iconName: isCard(type) ? "card.gif" : undefined,
  }));

const isCard = (type: RAthenaItem["type"]) => type === "6";
