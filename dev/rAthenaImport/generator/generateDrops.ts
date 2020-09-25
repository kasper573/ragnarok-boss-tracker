import * as fs from "fs";
import { ParsedDrop } from "../types/ParsedDrop";
import { MobId } from "../../../src/state/MobId";
import { format } from "prettier";
import { warning } from "./warning";

export const generateDrops = (
  outputFile: string,
  drops: Map<MobId, ParsedDrop[]>
) => {
  fs.writeFileSync(
    outputFile,
    itemReferences(format(dropsTemplate(drops), { parser: "babel" }))
  );
};

const dropsTemplate = (drops: Map<MobId, ParsedDrop[]>) => `// ${warning}.
import { items } from "./items";
import { Drop } from "../../state/Drop";

export const drops: Record<string, Drop[]> =
${JSON.stringify(Object.fromEntries(drops.entries()))};
`;

const itemReferences = (jsonString: string) =>
  jsonString.replace(/item: (\d+)/g, (match, id) => `item: items[${id}]`);
