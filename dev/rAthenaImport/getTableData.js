exports.getTableData = (dataExport) => {
  const table = dataExport.find((node) => node.type === "table");
  return (table && table.data) || [];
};
