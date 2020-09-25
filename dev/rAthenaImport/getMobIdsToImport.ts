import * as fs from "fs";
import * as path from "path";
import { MobId } from "../../src/state/MobId";

export const getMobIdsToImport = () => {
  const mobsTS = fs.readFileSync(
    path.resolve(__dirname, "../../src/fixtures/mobs.ts"),
    "utf8"
  );
  const exp = /id: (\d+)/g;
  let match;
  const ids: MobId[] = [];
  while ((match = exp.exec(mobsTS))) {
    ids.push(parseInt(match[1], 10) as MobId);
  }
  return ids;
};
