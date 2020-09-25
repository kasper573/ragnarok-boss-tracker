import * as fs from "fs";
import { itemsTemplate } from "./itemsTemplate";
import { ParsedItem } from "./ParsedItem";

export const generateItems = (outputFile: string, items: ParsedItem[]) =>
  fs.writeFileSync(outputFile, itemsTemplate(items));
