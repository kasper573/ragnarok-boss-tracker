import { ParsedDrop } from "../types/ParsedDrop";
import { MobId } from "../../../src/state/MobId";
import { warning } from "./warning";

export const dropsTemplate = (
  drops: Map<MobId, ParsedDrop[]>
) => `// ${warning}.
import { items } from "./items";
import { Drop } from "../../state/Drop";

export const drops: Record<string, Drop[]> = ${itemReferences(
  JSON.stringify(Object.fromEntries(drops.entries()), null, 2)
)};
`;

const itemReferences = (jsonString: string) =>
  jsonString.replace(/"item": (\d+)/g, (match, id) => `"item": items[${id}]`);
