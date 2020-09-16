import { Hunt } from "./Hunt";

export const updateHunt = (hunt: Hunt, changes: Partial<Hunt>): Hunt => ({
  ...hunt,
  ...changes,
});
