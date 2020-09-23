export const totalChance = (chances: number[], sampleSize: number = 1000) => {
  let successes = 0;
  for (let i = 0; i < sampleSize; i++) {
    for (const chance of chances) {
      if (Math.random() < chance) {
        successes++;
        break;
      }
    }
  }
  return successes / sampleSize;
};
