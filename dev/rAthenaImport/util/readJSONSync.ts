const fs = require("fs");

export const readJSONSync = (filePath: string) =>
  JSON.parse(fs.readFileSync(filePath, "utf8"));
