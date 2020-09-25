import { ParsedItem } from "./ParsedItem";
import { generatedWarning } from "./generatedWarning";

export const itemsTemplate = (items: ParsedItem[]) => `// ${generatedWarning}.
import { ItemId } from "../../state/ItemId";

export const items = ${addAsItemId(JSON.stringify(groupById(items), null, 2))};
`;

const groupById = (items: ParsedItem[]) =>
  items.reduce((group, item) => ({ ...group, [item.id]: item }), {});

const addAsItemId = (jsonString: string) =>
  jsonString.replace(/"id": (\d+)/g, (match, id) => `"id": ${id} as ItemId`);
