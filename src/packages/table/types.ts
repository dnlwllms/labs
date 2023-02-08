import { FC, PropsWithChildren, ReactElement } from "react";

export type ColumnDataType = "string" | "date" | "number";

export type FilterCondition = "same" | "contain" | "more-then" | "less-then";

export type TableColumn = {
  key: string;
  title: string;
  dataType?: ColumnDataType;
  width?: number;
  children?: TableColumn[];
  filter?: unknown;
};

export type TableClientColumn = TableColumn & {
  colSpan: number;
};

export interface TableProps extends PropsWithChildren {
  columns: Array<TableColumn>;
  data: any;
}

export type TableContextType = {
  entryColumns: TableClientColumn[][];
  entryData: string[][][];
};

export type InternalTable = {
  Head: FC<HeadProps>;
  Body: FC<BodyProps>;
};

export interface TableComponent extends FC<TableProps>, InternalTable {}

export interface HeadProps {
  children?: (context: TableContextType) => ReactElement | ReactElement[];
}

export interface BodyProps {
  children?: (context: TableContextType) => ReactElement | ReactElement[];
}
