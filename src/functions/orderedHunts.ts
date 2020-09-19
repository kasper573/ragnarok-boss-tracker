import { Hunt } from "../state/Hunt";

export const orderedHunts = (hunts: Hunt[]) => {
  const wTime = hunts.filter((h) => h.killTime);
  const noTime = hunts.filter((h) => !h.killTime);
  const byName = noTime.sort((a, b) => a.boss.name.localeCompare(b.boss.name));
  const byTime = wTime.sort((a, b) => a.start!.getTime() - b.start!.getTime());
  return byName.concat(byTime);
};
