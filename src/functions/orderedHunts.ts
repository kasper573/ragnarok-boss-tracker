import { Hunt } from "../state/Hunt";

export const orderedHunts = (hunts: Hunt[]) =>
  hunts.slice().sort((a, b) => a.start.getTime() - b.start.getTime());
