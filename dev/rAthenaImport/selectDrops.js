exports.selectDrops = (availableDrops, selectForMobIds) =>
  selectForMobIds.reduce(
    (filteredDrops, mobId) => ({
      ...filteredDrops,
      [mobId]: availableDrops[mobId] || [],
    }),
    {}
  );
