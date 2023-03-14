import { FC, useContext } from "react";
import { TableBodyProps } from "../../types";
import { TableContext } from "../context";

const Body: FC<TableBodyProps> = ({ children, ...props }) => {
  const tableContext = useContext(TableContext);

  return (
    <tbody {...props}>
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
};

export default Body;
