import { useCallback, useEffect, useRef, useState } from "react";

type ResizeOptions = {
  /**
   * 최소 컬럼 사이즈 (default: 50)
   */
  minColWidth?: number;
};

export const useColumnResize = (resizeOptions?: ResizeOptions) => {
  const tableRef = useRef<HTMLTableElement>(null);

  const [tableWidth, setTableWidth] = useState(0);
  const [columnWidth, setColumnWidth] = useState(0);
  const [triggerX, setTriggerX] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const minColWidth = resizeOptions?.minColWidth || 50;

  // 각 컬럼 및 테이블 초기 사이즈 지정
  useEffect(() => {
    if (tableRef.current) {
      const columns = tableRef.current.querySelectorAll("col");
      columns.forEach((column) => {
        const { width: columnWidth } = column.getBoundingClientRect();
        column.style.width = column.style.width
          ? column.style.width
          : `${columnWidth}px`;
      });

      const { width: tableWidth } = tableRef.current.getBoundingClientRect();
      tableRef.current.style.width = `${tableWidth}px`;
    }
  }, []);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      if (tableRef.current && columnWidth && triggerX) {
        // 컬럼 사이즈만 조정하면 최대 크기에서 더 이상 커지지 않기 때문에 테이블 사이즈도 조정이 필요함
        const column =
          tableRef.current.querySelectorAll("col")?.[selectedIndex];

        // 변화한 크기
        const changedWitdh = e.pageX - triggerX;
        // 기존 컬럼 크기 + 변화한 크기
        const resizedColWidth = columnWidth + changedWitdh;
        // 기존 테이블 크기 + 변화한 크기
        const resizedTableWidth = tableWidth + changedWitdh;

        if (column && resizedColWidth > minColWidth) {
          column.style.width = `${resizedColWidth}px`;
          tableRef.current.style.width = `${resizedTableWidth}px`;
        }
      }
    },
    [columnWidth, triggerX]
  );

  const handleUp = useCallback(() => {
    setColumnWidth(0);
    setTriggerX(0);
  }, []);

  useEffect(() => {
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("mousemove", handleMove);
    };
  }, [handleMove, handleUp]);

  const handleDown = (index: number, e: React.MouseEvent<HTMLElement>) => {
    // 선택된 컬럼 인덱스, 트리거, 컬럼 사이즈, 테이블 사이즈, 트리거 X좌표를 초기화
    setSelectedIndex(index);
    // 인터렉션이 시작되면 이벤트를 트리깅 하기 위해서 state로 관리(인터렉션 종료 시 이벤트 핸들러 삭제하기 위한 용도)
    const trigger = e.target as HTMLElement;
    const column = trigger.parentElement as HTMLElement;
    const { width: columnWidth } = column.getBoundingClientRect();
    setColumnWidth(columnWidth);
    const table = tableRef.current;
    if (table) {
      const { width: tableWidth } = table.getBoundingClientRect();
      setTableWidth(tableWidth);
    }

    setTriggerX(e.pageX);
  };

  return { tableRef, handleDown };
};
