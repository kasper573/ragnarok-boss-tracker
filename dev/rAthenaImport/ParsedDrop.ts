import { Drop } from "../../src/state/Drop";
import { ItemId } from "../../src/state/ItemId";

export type ParsedDrop = Pick<Drop, "mvp" | "chance"> & {
  item: ItemId;
};
