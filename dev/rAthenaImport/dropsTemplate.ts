import { ParsedDrop } from "./ParsedDrop";
import { MobId } from "../../src/state/MobId";
import { generatedWarning } from "./generatedWarning";

export const dropsTemplate = (
  drops: Map<MobId, ParsedDrop[]>
) => `// ${generatedWarning}.
import { items } from "./items";
import { Drop } from "../../state/Drop";

export const drops: Record<string, Drop[]> = ${itemReferences(
  JSON.stringify(Object.fromEntries(drops.entries()), null, 2)
)};
`;

const itemReferences = (jsonString: string) =>
  jsonString.replace(/"item": (\d+)/g, (match, id) => `"item": items[${id}]`);
