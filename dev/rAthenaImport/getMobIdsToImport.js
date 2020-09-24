const fs = require("fs");
const path = require("path");

exports.getMobIdsToImport = () => {
  const mobsTS = fs.readFileSync(
    path.resolve(__dirname, "../../src/fixtures/mobs.ts")
  );
  const exp = /id: (\d+)/g;
  let match;
  const ids = [];
  while ((match = exp.exec(mobsTS))) {
    ids.push(match[1]);
  }
  return ids;
};
