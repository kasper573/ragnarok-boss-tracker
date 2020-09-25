import { RAthenaExport } from "../types/RAthenaExport";

export const parseTableData = <T>(dataExport: RAthenaExport<T>): T[] => {
  const table = dataExport.find((node) => node.type === "table");
  return (table && table.data) || [];
};
