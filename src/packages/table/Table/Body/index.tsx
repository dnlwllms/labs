import { forwardRef, useContext } from "react";
import { TableBodyProps } from "../../types";
import { TableContext } from "../context";

const Body = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children }, ref) => {
    const tableContext = useContext(TableContext);

    return (
      <tbody ref={ref}>
        {children ||
          tableContext.entryData.map((row, index) => {
            const key =
              tableContext.clientData[index]?.[tableContext.asKey || "id"] ||
              index;

            return (
              <tr key={key}>
                {row.map(([key, value]) => {
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
  }
);

export default Body;
