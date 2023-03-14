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
        thead.style.transform = `translate(${rect.x}, ${rect.y})`;
      } else {
        thead.style.position = "static";
        thead.style.transform = ``;
      }
    }
  }, [fixed]);

  const tableContext = useContext(TableContext);

  return (
    <thead ref={ref}>
      {children ||
        tableContext.entryColumns.map((row, rowIndex) => {
          console.log(row[rowIndex]);
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
