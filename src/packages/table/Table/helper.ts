import { StringUtility } from "@dnlwllms/util";
import { TableClientColumn, TableColumn } from "../types";

const { getRandomWord } = StringUtility;

export const getTestTableData = (
  testColumns: Array<TableColumn>,
  size = 100
) => {
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

export const getEntryColumns = (columns: Array<TableColumn>) => {
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

export const getLastDepthColumnKeys = (columns: Array<TableColumn>) => {
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

export const getEntryDataBindingColumns = <T extends any>(
  columns: Array<TableColumn>,
  data: Array<T>
) => {
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

export const getTestColumnData = (scale: Array<number> = [1, 2, 5]) => {
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

export const getColSpanByColumn = (column: TableColumn) => {
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

export const getColSpanByScale = (scale: Array<number>) => {
  if (scale.length === 1) {
    return 1;
  }

  return scale.reduce((prev, current, currentIndex) => {
    if (currentIndex > 1) {
      return prev * current;
    } else {
      return current;
    }
  });
};
