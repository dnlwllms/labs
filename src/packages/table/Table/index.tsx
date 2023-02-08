import { FC, useContext, useMemo, useState } from "react";
import { getEntryColumns, getEntryDataBindingColumns } from "./helper";
import { BodyProps, HeadProps, TableColumn, TableComponent } from "../types";
import { TableContext } from "./context";

const Table: TableComponent = ({ columns, data, children }) => {
  const [clientColumns] = useState<TableColumn[]>(columns);
  const entryColumns = getEntryColumns(clientColumns);
  const [clientData] = useState(data);
  const entryData = getEntryDataBindingColumns(columns, clientData);

  const contextValue = useMemo(() => {
    return {
      entryColumns,
      entryData,
    };
  }, [entryColumns, entryData]);

  // TODO -- 필터 관련 로직
  // const [appliedFilters, setAppliedFilters] = useState<
  //   Array<{
  //     column: TableClientColumn;
  //     condition: FilterCondition;
  //     value: string;
  //   }>
  // >([]);

  // const defaultCondition = "same";
  // const [filterCondition, setFilterCondition] =
  //   useState<FilterCondition>(defaultCondition);
  // const [filterValue, setFilterValue] = useState("");
  // useEffect(() => {
  //   setFilterCondition(defaultCondition);
  //   setFilterValue("");
  // }, []);

  // const handleFilterClick = (column: TableClientColumn) => {};

  // const handleFilterSubmit = (column: TableClientColumn) => {
  //   if (!filterValue) {
  //     return;
  //   }
  //   let filteredData = clientData.concat();
  //   switch (filterCondition) {
  //     case "same":
  //       filteredData = clientData.filter((row: any) =>
  //         typeof row[column.key] === "string"
  //           ? row[column.key] === filterValue
  //           : String(row[column.key]) === filterValue
  //       );
  //       break;
  //     case "contain":
  //       filteredData = clientData.filter((row: any) =>
  //         typeof row[column.key] === "string"
  //           ? row[column.key].includes(filterValue)
  //           : String(row[column.key]).includes(filterValue)
  //       );
  //       break;
  //   }
  //   setClientData(filteredData);
  //   setAppliedFilters([
  //     ...appliedFilters,
  //     {
  //       column,
  //       condition: filterCondition,
  //       value: filterValue,
  //     },
  //   ]);
  // };

  // const handleFilterReset = () => {
  //   setClientData(data);
  //   setAppliedFilters([]);
  // };

  // const renderFilter = (rect: DOMRect) => {
  //   return (
  //     <div
  //       onClick={(e) => e.stopPropagation()}
  //       style={{
  //         position: "fixed",
  //         background: "white",
  //         padding: 20,
  //         top: rect.top,
  //         left: rect.left,
  //       }}
  //     >
  //       <h3>필터</h3>
  //     </div>
  //   );
  // };

  return (
    <TableContext.Provider value={contextValue}>
      <table>
        <colgroup>
          {entryColumns[entryColumns.length - 1].map(({ key, width }) => (
            <col key={key} style={{ width }} />
          ))}
        </colgroup>
        {children}
      </table>
    </TableContext.Provider>
  );
};

const Head: FC<HeadProps> = ({ children }) => {
  const tableContext = useContext(TableContext);

  return (
    <thead>
      {children
        ? children(tableContext)
        : tableContext.entryColumns.map((row, rowIndex) => {
            return (
              <tr key={row[rowIndex].key}>
                {row.map((column) => {
                  return (
                    <th key={column.key} colSpan={column.colSpan}>
                      {column.title}
                    </th>
                  );
                })}
              </tr>
            );
          })}
    </thead>
  );
};

const Body: FC<BodyProps> = ({ children }) => {
  const tableContext = useContext(TableContext);

  return (
    <tbody>
      {children
        ? children(tableContext)
        : tableContext.entryData.map((row) => {
            return (
              <tr key={row[0][0]}>
                {row.slice(1).map(([key, value]) => {
                  return (
                    <td key={key} title={value.toString()}>
                      {value.toString()}
                    </td>
                  );
                })}
              </tr>
            );
          })}
    </tbody>
  );
};

Table.Head = Head;
Table.Body = Body;

export default Table;
