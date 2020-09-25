import { Item } from "../../../src/state/Item";

export type ParsedItem = Omit<Item, "iconUrl"> & {
  iconName: string;
};
