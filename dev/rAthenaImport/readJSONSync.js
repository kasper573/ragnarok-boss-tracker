const fs = require("fs");

exports.readJSONSync = (filePath) =>
  JSON.parse(fs.readFileSync(filePath, "utf8"));
