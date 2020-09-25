import * as fs from "fs";
import { ParsedDrop } from "../types/ParsedDrop";
import { Drop } from "../../../src/state/Drop";
import { MobId } from "../../../src/state/MobId";
import { format } from "prettier";
import { warning } from "./warning";

export const generateDrops = (
  outputFile: string,
  drops: Map<MobId, ParsedDrop[]>
) => {
  fs.writeFileSync(
    outputFile,
    itemReferences(format(dropsTemplate(drops), { parser: "babel-ts" }))
  );
};

const dropsTemplate = (drops: Map<MobId, ParsedDrop[]>) => `// ${warning}.
import { items } from "./items";
import { Drop } from "../../state/Drop";

export const drops: Record<string, Drop[]> =
${JSON.stringify(Object.fromEntries(drops.entries()), null, 2)};
`;

const itemIdProp: keyof ParsedDrop = "itemId";
const itemProp: keyof Drop = "item";

const itemReferences = (jsonString: string) =>
  jsonString.replace(
    new RegExp(`${itemIdProp}: (\\d+)`, "g"),
    (match, id) => `${itemProp}: items[${id}]`
  );
