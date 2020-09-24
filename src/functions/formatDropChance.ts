export const formatDropChance = (percentage: number) =>
  (percentage < 1 ? percentage.toPrecision(1) : Math.round(percentage)) + "%";
