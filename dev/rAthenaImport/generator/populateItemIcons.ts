import { ParsedItem } from "../types/ParsedItem";
import { ItemId } from "../../../src/state/ItemId";
import * as path from "path";
import * as fs from "fs";
const { image: downloadImage } = require("image-downloader");

export async function populateItemIcons(
  items: ParsedItem[],
  outputIconFolder: string,
  getItemIconUrl: (id: ItemId) => string
) {
  for (const item of items) {
    if (item.iconName) {
      // Already been handled externally
      continue;
    }

    const url = getItemIconUrl(item.id);
    if (!url) {
      // No url means we skip icon for this item
      continue;
    }

    const filename = path.basename(url);

    // Only download new files
    if (!fs.existsSync(path.join(outputIconFolder, filename))) {
      try {
        await downloadImage({ url, dest: outputIconFolder });
        console.log(`Downloaded new icon file: ${filename}`);
      } catch (e) {
        console.warn(
          `Could not download item icon from "${url}". Reason: ${e}`
        );
        continue; // Skip icon for this item
      }
    }

    // Remember file name for code generation
    item.iconName = filename;
  }
}
