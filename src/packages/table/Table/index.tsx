import { useState } from "react";
import { getEntryColumns, getEntryDataBindingColumns } from "./helper";
import { TableColumn, TableComponent } from "../types";
import { TableContext } from "./context";

import Head from "./Head";
import Body from "./Body";

const Table: TableComponent = ({ columns, data, children }) => {
  const [clientColumns] = useState<TableColumn[]>(columns);
  const entryColumns = getEntryColumns(clientColumns);
  const [clientData, setClientData] = useState(data);
  const entryData = getEntryDataBindingColumns(columns, clientData);

  const contextValue = {
    columns,
    data,
    setData: setClientData,
    entryColumns,
    entryData,
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
