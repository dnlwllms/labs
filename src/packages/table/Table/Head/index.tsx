import { FC, useContext, useEffect, useRef, useState } from "react";
import { TableHeadProps } from "../../types";
import { TableContext } from "../context";

const Head: FC<TableHeadProps> = ({ children, fixed = true }) => {
  const ref = useRef<HTMLTableSectionElement>(null);

  const [rect, setRect] = useState<DOMRect>();

  useEffect(() => {
    const thead = ref.current;

    if (thead) {
      const rect = thead.getBoundingClientRect();
      setRect(rect);
    }
  }, []);

  useEffect(() => {
    const thead = ref.current;
    if (thead && rect) {
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
  }, [fixed, rect]);

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
