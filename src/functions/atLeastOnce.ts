/**
 * Based on https://www.khanacademy.org/math/ap-statistics/probability-ap/probability-multiplication-rule/a/probabilities-involving-at-least-one-success
 * P(at least 1 success) = 1 - P(all failures)
 */
export const atLeastOnce = (probabilitiesOfSuccess: number[]) =>
  1 -
  probabilitiesOfSuccess.reduce(
    (failureSum, independentSuccess) => failureSum * (1 - independentSuccess),
    1
  );
