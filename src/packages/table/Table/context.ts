import { createContext } from "react";
import { TableContextType } from "../types";

export const TableContext = createContext<TableContextType>({
  columns: [],
  data: [],
  clientData: [],
  setClientData: console.debug,
  entryColumns: [],
  entryData: [],
  appliedFilters: [],
  setAppliedFilters: console.debug,
});
