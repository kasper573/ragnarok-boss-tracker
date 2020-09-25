import * as fs from "fs";
import { dropsTemplate } from "./dropsTemplate";
import { ParsedDrop } from "../types/ParsedDrop";
import { MobId } from "../../../src/state/MobId";

export const generateDrops = (
  outputFile: string,
  drops: Map<MobId, ParsedDrop[]>
) => {
  fs.writeFileSync(outputFile, dropsTemplate(drops));
};
