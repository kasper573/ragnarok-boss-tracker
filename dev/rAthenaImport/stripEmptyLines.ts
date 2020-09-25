export const stripEmptyLines = (text: string) =>
  text.replace(/^\s*$(?:\r\n?|\n)/gm, "");
