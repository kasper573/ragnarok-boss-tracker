import * as fs from "fs";
import { MobId } from "../../../src/state/MobId";

export const getMobIdsToImport = (mobsFile: string) => {
  const mobsTS = fs.readFileSync(mobsFile, "utf8");
  const exp = /id: (\d+)/g;
  let match;
  const ids: MobId[] = [];
  while ((match = exp.exec(mobsTS))) {
    ids.push(parseInt(match[1], 10) as MobId);
  }
  return ids;
};
