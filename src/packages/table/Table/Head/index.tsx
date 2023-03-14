import { FC, useContext, useEffect, useRef } from "react";
import { TableHeadProps } from "../../types";
import { TableContext } from "../context";

const Head: FC<TableHeadProps> = ({ children, fixed = true }) => {
  const ref = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    const thead = ref.current;
    if (thead) {
      const rect = thead.getBoundingClientRect();

      if (fixed) {
        thead.style.position = "fixed";
        thead.style.top = `${rect.top}px`;
        thead.style.left = `${rect.left}px`;
      } else {
        thead.style.position = "static";
        thead.style.top = `0`;
        thead.style.left = `0`;
      }
    }
  }, [fixed]);

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
};

export default Head;
