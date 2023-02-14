import { useState } from "react";
import { getEntryColumns, getEntryDataBindingColumns } from "./helper";
import { FilterCondition, TableColumn, TableComponent } from "../types";
import { TableContext } from "./context";

import Head from "./Head";
import Body from "./Body";

const Table: TableComponent = ({ columns, data, children }) => {
  // --> Column 관련 hooks
  // 클라이언트 전용 display 칼럼 (컬럼 숨기기와 같은 기능을 구현하기 위해 보이는 column과 초기값 구분)
  const [clientColumns] = useState<TableColumn[]>(columns);
  // 클라이언트에서 쉽게 사용하기 위해 entry 스타일로 변환한 데이터
  const entryColumns = getEntryColumns(clientColumns);

  // --> Data 관련 hooks
  // 클라이언트 전용 display 데이터 (필터와 같은 기능을 구현하기 위해 보이는 data과 초기값 구분)
  const [clientData, setClientData] = useState(data);
  // 클라이언트에서 쉽게 사용하기 위해 entry 스타일로 변환한 데이터
  const entryData = getEntryDataBindingColumns(columns, clientData);

  // --> Filter 관련 hooks
  // 현재 적용된 필터 데이터
  const [appliedFilters, setAppliedFilters] = useState<
    Array<{
      filterCondition: FilterCondition;
      column: TableColumn;
      filterValue: string;
    }>
  >([]);

  const contextValue = {
    columns,
    data,
    clientData,
    setClientData,
    entryColumns,
    entryData,
    appliedFilters,
    setAppliedFilters,
  };

  return (
    <TableContext.Provider value={contextValue}>
      <table>
        <colgroup>
          {entryColumns[entryColumns.length - 1].map(({ key, width }) => (
            <col key={key} style={{ width }} />
          ))}
        </colgroup>
        {children(contextValue)}
      </table>
    </TableContext.Provider>
  );
};

Table.Head = Head;
Table.Body = Body;

export default Table;
