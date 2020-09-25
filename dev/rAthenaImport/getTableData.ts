import { RAthenaExport } from "./RAthenaExport";

export const getTableData = <T>(dataExport: RAthenaExport<T>): T[] => {
  const table = dataExport.find((node) => node.type === "table");
  return (table && table.data) || [];
};
