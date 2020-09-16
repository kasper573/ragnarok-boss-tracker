export function abbreviate(str: string) {
  const words = str.split(/\s+/);
  switch (words.length) {
    case 1:
      return str;
    case 2:
      return `${words[0]} ${words[1][0].toUpperCase()}`;
    default:
      return words
        .map((word) => word[0])
        .join("")
        .toUpperCase();
  }
}
