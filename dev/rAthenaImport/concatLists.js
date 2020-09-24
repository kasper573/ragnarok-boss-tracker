exports.concatLists = (lists) =>
  lists.reduce((listA, listB) => [...listA, ...listB], []);
