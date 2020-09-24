exports.selectItems = (availableItems, selectForDrops) => {
  const referencedItemIds = Object.values(selectForDrops).reduce(
    (referencedItemIds, mobDrops) => {
      for (const drop of mobDrops) {
        if (!referencedItemIds.includes(drop.item)) {
          referencedItemIds.push(drop.item);
        }
      }
      return referencedItemIds;
    },
    []
  );

  return referencedItemIds.map((itemId) =>
    availableItems.find((item) => item.id === itemId)
  );
};
