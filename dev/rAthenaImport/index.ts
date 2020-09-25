import * as fs from "fs";
import * as path from "path";
import { concatLists } from "./concatLists";
import { readJSONSync } from "./readJSONSync";
import { getTableData } from "./getTableData";
import { parseDataFile } from "./parseDataFile";
import { parseItemsFromItemDB } from "./parseItemsFromItemDB";
import { parseDropsFromMobDB } from "./parseDropsFromMobDB";
import { parseDropsFromMobDrop } from "./parseDropsFromMobDrop";
import { getMobIdsToImport } from "./getMobIdsToImport";
import { selectDrops } from "./selectDrops";
import { selectItems } from "./selectItems";
import { generateItems } from "./generateItems";
import { generateDrops } from "./generateDrops";

const outputFolder = path.resolve(__dirname, "../../src/fixtures/generated");
const inputFolder = process.argv[2];

if (!inputFolder) {
  console.error("Usage: npm run import [path to data folder]");
  process.exit();
}

const allItems = concatLists(
  [
    path.resolve(inputFolder, "item_db_re.json"),
    path.resolve(inputFolder, "item_db2_re.json"),
  ].map((file) => parseItemsFromItemDB(getTableData(readJSONSync(file))))
);

const allDrops = parseDropsFromMobDB(
  concatLists(
    [
      path.resolve(inputFolder, "mob_db_re.json"),
      path.resolve(inputFolder, "mob_db2_re.json"),
    ].map((file) => getTableData(readJSONSync(file)))
  )
);

parseDropsFromMobDrop(
  allDrops,
  parseDataFile(
    fs.readFileSync(path.resolve(inputFolder, "mob_drop.txt"), "utf8")
  )
);

const mobIds = getMobIdsToImport();
const referencedDrops = selectDrops(allDrops, mobIds);
const referencedItems = selectItems(allItems, referencedDrops);

generateItems(path.join(outputFolder, "items.ts"), referencedItems);
generateDrops(path.join(outputFolder, "drops.ts"), referencedDrops);
