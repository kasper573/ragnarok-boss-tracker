import * as fs from "fs";
import { ParsedItem } from "../types/ParsedItem";
import { format } from "prettier";
import { warning } from "./warning";
import { Item } from "../../../src/state/Item";

export const generateItems = (outputFile: string, items: ParsedItem[]) =>
  fs.writeFileSync(
    outputFile,
    format(addAsItemId(iconRequires(itemsTemplate(items))), {
      parser: "babel-ts",
    })
  );

const itemsTemplate = (items: ParsedItem[]) => `// ${warning}.
import { ItemId } from "../../state/ItemId";
import { assetUrl } from "../../functions/assetUrl";
export const items = ${JSON.stringify(groupById(items), null, 2)};
`;

const groupById = (items: ParsedItem[]) =>
  items.reduce((group, item) => ({ ...group, [item.id]: item }), {});

const addAsItemId = (jsonString: string) =>
  jsonString.replace(/"id": (\d+)/g, (match, id) => `"id": ${id} as ItemId`);

const iconNameProp: keyof ParsedItem = "iconName";
const iconUrlProp: keyof Item = "iconUrl";

const iconRequires = (jsonString: string) =>
  jsonString.replace(
    new RegExp(`"${iconNameProp}": "(.*?)"`, "g"),
    (match, filename) =>
      `"${iconUrlProp}": assetUrl("items/${filename}")`
  );
