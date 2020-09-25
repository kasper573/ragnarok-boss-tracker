import { RAthenaItem } from "./RAthenaItem";
import { ParsedItem } from "./ParsedItem";
import { ItemId } from "../../src/state/ItemId";

export const parseItems = (itemTableData: RAthenaItem[]): ParsedItem[] =>
  itemTableData.map(({ id, name_japanese }) => ({
    id: parseInt(id, 10) as ItemId,
    name: name_japanese,
  }));
