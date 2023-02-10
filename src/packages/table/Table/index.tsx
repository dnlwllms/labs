import { useState } from "react";
import { getEntryColumns, getEntryDataBindingColumns } from "./helper";
import { FilterCondition, TableColumn, TableComponent } from "../types";
import { TableContext } from "./context";

import Head from "./Head";
import Body from "./Body";

const Table: TableComponent = ({ columns, data, children }) => {
  const [clientColumns] = useState<TableColumn[]>(columns);
  const entryColumns = getEntryColumns(clientColumns);
  const [clientData, setClientData] = useState(data);
  const entryData = getEntryDataBindingColumns(columns, clientData);

  // 현재 적용된 Filter를 관리하는 hooks
  const [appliedFilters, setAppliedFilters] = useState<
    Array<{
      filterCondition: FilterCondition;
      column: TableColumn;
      filterValue: string;
    }>
  >([]);

  const contextValue = {
    columns,
    data,
    clientData,
    setClientData,
    entryColumns,
    entryData,
    appliedFilters,
    setAppliedFilters,
  };

  return (
    <TableContext.Provider value={contextValue}>
      <table>
        <colgroup>
          {entryColumns[entryColumns.length - 1].map(({ key, width }) => (
            <col key={key} style={{ width }} />
          ))}
        </colgroup>
        {children(contextValue)}
      </table>
    </TableContext.Provider>
  );
};

Table.Head = Head;
Table.Body = Body;

export default Table;
