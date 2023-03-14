import { FC, useContext } from "react";
import { TableHeadProps } from "../../types";
import { TableContext } from "../context";

const Head: FC<TableHeadProps> = ({ children }) => {
  const tableContext = useContext(TableContext);

  return (
    <thead>
      {children ||
        tableContext.entryColumns.map((row, rowIndex) => {
          return (
            <tr key={row[rowIndex].key}>
              {row.map((column) => {
                return (
                  <th
                    key={column.key}
                    colSpan={column.colSpan}
                    align={column.headerAlign}
                  >
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
