import { Hunt, huntStart } from "../state/Hunt";
import { Dictionary } from "@reduxjs/toolkit";
import { Mob } from "../state/Mob";

export const orderedHunts = (hunts: Hunt[], mobs: Dictionary<Mob>) => {
  const wTime = hunts.filter((h) => h.killTime);
  const noTime = hunts.filter((h) => !h.killTime);
  const byName = noTime.sort((a, b) => {
    const aName = mobs[a.id]?.name ?? "";
    const bName = mobs[b.id]?.name ?? "";
    return aName.localeCompare(bName);
  });
  const byTime = wTime.sort((a, b) => {
    const aStart = huntStart(a, mobs[a.id])?.getTime() ?? 0;
    const bStart = huntStart(b, mobs[b.id])?.getTime() ?? 0;
    return aStart - bStart;
  });
  return byName.concat(byTime);
};
