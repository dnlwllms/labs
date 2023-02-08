import { FC, useContext } from "react";
import { TableBodyProps } from "../../types";
import { TableContext } from "../context";

const Body: FC<TableBodyProps> = ({ children }) => {
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

export default Body;
