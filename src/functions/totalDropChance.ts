import { Drop } from "../state/Drop";

export const totalDropChance = (drops: Drop[], sampleSize: number = 1000) => {
  const chances = drops.map((drop) => drop.chance);
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
