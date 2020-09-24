exports.parseItems = (itemTableData) =>
  itemTableData.map(({ id, name_japanese }) => ({
    id: parseInt(id, 10),
    name: name_japanese,
  }));
