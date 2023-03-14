import { forwardRef, useContext } from "react";
import { TableHeadProps } from "../../types";
import { TableContext } from "../context";

const Head = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ children }, ref) => {
    const tableContext = useContext(TableContext);

    return (
      <thead ref={ref}>
        {children ||
          tableContext.entryColumns.map((row, rowIndex) => {
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
  }
);

export default Head;
