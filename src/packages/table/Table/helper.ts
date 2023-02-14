import { StringUtility } from "@dnlwllms/util";
import { TableClientColumn, TableColumn } from "../types";

const { getRandomWord } = StringUtility;

/**
 * 테이블의 mock data를 생성해주는 함수
 * @param {Array<TableColumn>} testColumns mock columns
 * @param {number} size raw data 개수(default: 100)
 * @returns {Record<string, unknown>[]} 객체 배열 형태로 리턴
 */
export const getTestTableData = (
  testColumns: Array<TableColumn>,
  size = 100
): Record<string, unknown>[] => {
  const columnKeys = getLastDepthColumnKeys(testColumns);
  const data = [];
  for (let i = 0; i < size; i++) {
    const row: Record<string, unknown> = {};
    columnKeys.forEach((key) => {
      row[key] = getRandomWord();
    });

    data.push(row);
  }

  return data;
};

/**
 * props로 전달 받은 column을 render단에서 쉽게 사용하기 위해 가공해주는 함수
 * @param {Array<TableColumn>} columns Table 컴포넌트의 column props
 * @returns {TableClientColumn[][]}
 */
export const getEntryColumns = (
  columns: Array<TableColumn>
): TableClientColumn[][] => {
  const entryColumns: Array<Array<TableClientColumn>> = [];

  const add = (children: Array<TableColumn>, depth = 0) => {
    entryColumns[depth] = entryColumns[depth] || [];
    children.forEach((column) => {
      entryColumns[depth].push({
        key: column.key,
        title: column.title,
        width: column.width,
        colSpan: getColSpanByColumn(column),
      });
      if (column.children) {
        add(column.children, depth + 1);
      }
    });
  };

  add(columns);

  return entryColumns;
};

/**
 * TableColumn 배열의 마지막 depth의 key들을 추출해주는 helper 함수
 *
 * (children이 있으면 실제 컬럼이 아니라 그룹핑된 2중 이상 컬럼이기 때문에 최하위 컬럼을 추출해야함)
 *
 * @param columns
 * @returns {string[]}
 */
export const getLastDepthColumnKeys = (
  columns: Array<TableColumn>
): string[] => {
  const keys: Array<string> = [];

  const add = (children: Array<TableColumn>) => {
    children.forEach((column) => {
      if (column.children) {
        add(column.children);
      } else {
        keys.push(column.key);
      }
    });
  };

  add(columns);

  return keys;
};

/**
 * Column key를 data의 필드 이름으로 바인딩 해주는 함수
 *
 * @param {Array<TableColumn>} columns
 * @param {Array<T>} data
 * @returns {string[][][]}
 */
export const getEntryDataBindingColumns = <T extends any>(
  columns: Array<TableColumn>,
  data: Array<T>
): string[][][] => {
  const columnKeys = getLastDepthColumnKeys(columns);
  const entryData: Array<Array<Array<string>>> = data.map(() => []);
  data.forEach((row, index) => {
    entryData[index][0] = [index.toString()];
    Object.entries(row as object).forEach(([key, value]) => {
      const columnIndex = columnKeys.findIndex(
        (columnKey) => columnKey === key
      );
      entryData[index][columnIndex + 1] = [key, value];
    });
  });

  return entryData;
};

/**
 * mock column을 만들어 주는 함수
 *
 * @param scale 0번 index부터 순서대로 컬럼의 depth를 입력하면된다.
 * @returns {TableColumn[]}
 */
export const getTestColumnData = (
  scale: Array<number> = [1, 2, 5]
): TableColumn[] => {
  scale.sort();

  const result: Array<TableColumn> = [];

  let lastDepthIndex = 0;

  const addChildren = (depth: number): Array<TableColumn> | undefined => {
    const columns: Array<TableColumn> = [];
    const currentDepth = depth + 1;

    if (currentDepth < scale.length) {
      const size = scale[currentDepth];
      for (let index = 0; index < size; index++) {
        const isLastDepth = currentDepth === scale.length - 1;
        if (isLastDepth) {
          columns.push({
            key: `${currentDepth}-${index}-${lastDepthIndex}`,
            title: `column-${currentDepth}-${index}-${lastDepthIndex}`,
          });
          lastDepthIndex += 1;
        } else {
          columns.push({
            key: `${currentDepth}-${index}`,
            title: `column-${currentDepth}-${index}`,
            children: addChildren(currentDepth),
          });
        }
      }
    }

    return columns;
  };

  const startIndex = 0;

  for (let i = startIndex; i < scale[startIndex]; i++) {
    result.push({
      key: `${startIndex}-${i}`,
      title: `column-${startIndex}-${i}`,
      children: addChildren(startIndex),
    });
  }

  return result;
};

/**
 * 첫번째 인자로 전달된 컬럼의 colspan이 children기반으로 얼마 인지를 반환한다.
 *
 * @param {TableColumn} column
 * @returns {number}
 */
export const getColSpanByColumn = (column: TableColumn): number => {
  let colSpan = 1;

  const add = (column: TableColumn) => {
    if (column.children) {
      colSpan--;
      colSpan += column.children.length;
      column.children.forEach((childColumn) => {
        add(childColumn);
      });
    }
  };

  add(column);

  return colSpan;
};
