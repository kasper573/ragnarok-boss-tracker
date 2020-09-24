const fs = require("fs");
const { itemsTemplate } = require("./itemsTemplate");

exports.generateItems = (outputFile, items) =>
  fs.writeFileSync(outputFile, itemsTemplate(items));
