export const concatLists = <T>(lists: T[][]): T[] =>
  lists.reduce((listA, listB) => [...listA, ...listB], [] as T[]);
