import { Item } from "./Item";

export type Drop = {
  mvp?: boolean; // true when an MVP bonus drop
  item: Item;
  chance: number; // 0-1 percentage
};
