import { Item } from "./Item";

export type Drop = {
  item: Item;
  chance: number; // 0-1 percentage
};
