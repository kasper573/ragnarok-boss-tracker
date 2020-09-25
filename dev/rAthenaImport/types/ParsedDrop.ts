import { Drop } from "../../../src/state/Drop";
import { ItemId } from "../../../src/state/ItemId";

export type ParsedDrop = Omit<Drop, "item"> & {
  itemId: ItemId;
};
