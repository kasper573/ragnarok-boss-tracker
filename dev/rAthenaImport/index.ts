import * as fs from "fs";
import * as path from "path";
import { concatLists } from "./util/concatLists";
import { readJSONSync } from "./util/readJSONSync";
import { parseTableData } from "./parser/parseTableData";
import { parseDataFile } from "./parser/parseDataFile";
import { parseItemsFromItemDB } from "./parser/parseItemsFromItemDB";
import { parseDropsFromMobDB } from "./parser/parseDropsFromMobDB";
import { parseDropsFromMobDrop } from "./parser/parseDropsFromMobDrop";
import { getMobIdsToImport } from "./util/getMobIdsToImport";
import { selectDrops } from "./selectDrops";
import { selectItems } from "./selectItems";
import { generateItems } from "./generator/generateItems";
import { generateDrops } from "./generator/generateDrops";

const mobsFile = path.resolve(__dirname, "../../src/fixtures/mobs.ts");
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
  ].map((file) => parseItemsFromItemDB(parseTableData(readJSONSync(file))))
);

const allDrops = parseDropsFromMobDB(
  concatLists(
    [
      path.resolve(inputFolder, "mob_db_re.json"),
      path.resolve(inputFolder, "mob_db2_re.json"),
    ].map((file) => parseTableData(readJSONSync(file)))
  )
);

parseDropsFromMobDrop(
  allDrops,
  parseDataFile(
    fs.readFileSync(path.resolve(inputFolder, "mob_drop.txt"), "utf8")
  )
);

const mobIds = getMobIdsToImport(mobsFile);
const referencedDrops = selectDrops(allDrops, mobIds);
const referencedItems = selectItems(allItems, referencedDrops);

generateItems(path.join(outputFolder, "items.ts"), referencedItems);
generateDrops(path.join(outputFolder, "drops.ts"), referencedDrops);
