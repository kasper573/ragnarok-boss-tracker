const fs = require("fs");
const { dropsTemplate } = require("./dropsTemplate");

exports.generateDrops = (outputFile, drops) => {
  fs.writeFileSync(outputFile, dropsTemplate(drops));
};
