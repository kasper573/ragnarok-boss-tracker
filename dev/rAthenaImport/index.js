const path = require("path");
const { selectItems } = require("./selectItems");
const { selectDrops } = require("./selectDrops");
const { getMobIdsToImport } = require("./getMobIdsToImport");
const { concatLists } = require("./concatLists");
const { generateItems } = require("./generateItems");
const { generateDrops } = require("./generateDrops");
const { readJSONSync } = require("./readJSONSync");
const { parseDrops } = require("./parseDrops");
const { parseItems } = require("./parseItems");
const { getTableData } = require("./getTableData");

const outputFolder = path.resolve(__dirname, "../../src/fixtures/generated");
const inputFolder = process.argv[2];
const itemInputFiles = [
  path.resolve(inputFolder, "item_db_re.json"),
  path.resolve(inputFolder, "item_db2_re.json"),
];
const dropsInputFiles = [
  path.resolve(inputFolder, "mob_db_re.json"),
  path.resolve(inputFolder, "mob_db2_re.json"),
];

if (!inputFolder) {
  console.error(
    "Usage: node ./rAthenaImport/index.js [path to server export folder]"
  );
  process.exit();
}

const allItems = concatLists(
  itemInputFiles.map((file) => parseItems(getTableData(readJSONSync(file))))
);

const allDrops = parseDrops(
  concatLists(dropsInputFiles.map((file) => getTableData(readJSONSync(file))))
);

const mobIds = getMobIdsToImport();
const referencedDrops = selectDrops(allDrops, mobIds);
const referencedItems = selectItems(allItems, referencedDrops);

generateItems(path.join(outputFolder, "items.ts"), referencedItems);
generateDrops(path.join(outputFolder, "drops.ts"), referencedDrops);
