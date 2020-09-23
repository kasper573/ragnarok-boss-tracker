export const groupBy = <T extends object, K extends string | number | symbol>(
  list: T[],
  getGroupByProperty: (o: T) => K
) =>
  list.reduce((groups, item) => {
    let group = groups[getGroupByProperty(item)];
    if (!group) {
      groups[getGroupByProperty(item)] = group = [];
    }
    group.push(item);
    return groups;
  }, {} as Record<K, T[]>);
