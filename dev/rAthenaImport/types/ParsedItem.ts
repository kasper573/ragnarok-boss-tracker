import { Item } from "../../../src/state/Item";

export type ParsedItem = Item & {
  iconName: string;
};
