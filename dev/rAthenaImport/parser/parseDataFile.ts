import { stripEmptyLines } from "../util/stripEmptyLines";
const stripComments = require("strip-comments");

/**
 * Parses generic CSV rAthena data files
 */
export const parseDataFile = (text: string): string[][] => {
  const lines = stripEmptyLines(stripComments(text)).split(/\n/);
  return lines.map((line) => line.split(","));
};
