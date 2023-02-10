import { createContext } from "react";
import { TableContextType } from "../types";

export const TableContext = createContext<TableContextType>({
  columns: [],
  data: [],
  setData: console.debug,
  entryColumns: [],
  entryData: [],
});
