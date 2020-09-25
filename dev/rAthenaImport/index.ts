import * as path from "path";
import { concatLists } from "./concatLists";
import { parseItems } from "./parseItems";
import { readJSONSync } from "./readJSONSync";
import { getTableData } from "./getTableData";
import { parseDrops } from "./parseDrops";
import { getMobIdsToImport } from "./getMobIdsToImport";
import { selectDrops } from "./selectDrops";
import { selectItems } from "./selectItems";
import { generateItems } from "./generateItems";
import { generateDrops } from "./generateDrops";

const outputFolder = path.resolve(__dirname, "../../src/fixtures/generated");
const inputFolder = process.argv[2];

if (!inputFolder) {
  console.error("Usage: npm run import [path to server export folder]");
  process.exit();
}

const itemInputFiles = [
  path.resolve(inputFolder, "item_db_re.json"),
  path.resolve(inputFolder, "item_db2_re.json"),
];
const dropsInputFiles = [
  path.resolve(inputFolder, "mob_db_re.json"),
  path.resolve(inputFolder, "mob_db2_re.json"),
];

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
