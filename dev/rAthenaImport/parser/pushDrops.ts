import { ParsedDrop } from "../types/ParsedDrop";

export const pushDrops = (
  existingDrops: ParsedDrop[],
  ...newDrops: ParsedDrop[]
) =>
  // Omit null item drops
  existingDrops.push(...newDrops.filter((drop) => drop.itemId !== 0));
