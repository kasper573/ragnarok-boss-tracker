import * as fs from "fs";
import { ParsedItem } from "../types/ParsedItem";
import { format } from "prettier";
import { warning } from "./warning";

export const generateItems = (outputFile: string, items: ParsedItem[]) =>
  fs.writeFileSync(
    outputFile,
    addAsItemId(format(itemsTemplate(items), { parser: "babel" }))
  );

const itemsTemplate = (items: ParsedItem[]) => `// ${warning}.
import { ItemId } from "../../state/ItemId";
export const items = ${JSON.stringify(groupById(items))};
`;

const groupById = (items: ParsedItem[]) =>
  items.reduce((group, item) => ({ ...group, [item.id]: item }), {});

const addAsItemId = (jsonString: string) =>
  jsonString.replace(/id: (\d+)/g, (match, id) => `id: ${id} as ItemId`);
