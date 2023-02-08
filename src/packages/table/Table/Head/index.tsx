import { FC, useContext } from "react";
import { TableHeadProps } from "../../types";
import { TableContext } from "../context";

const Head: FC<TableHeadProps> = ({ children }) => {
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

export default Head;
