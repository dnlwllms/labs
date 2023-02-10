import { MovePositionOption } from "@dnlwllms/util";
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
  Head: FC<TableHeadProps>;
  Body: FC<TableBodyProps>;
};

export interface TableComponent extends FC<TableProps>, InternalTable {}

export interface TableHeadProps {
  children?: (context: TableContextType) => ReactElement | ReactElement[];
}

export interface TableBodyProps {
  children?: (context: TableContextType) => ReactElement | ReactElement[];
}

export type InternalFilter = {
  Button: FC<FilterButtonProps>;
  Popup: FC<FilterPopupProps>;
};

export interface FilterComponent extends FC<FilterProps>, InternalFilter {}

export interface FilterProps extends PropsWithChildren {}

export interface FilterButtonProps {
  as?: ReactElement;
}

export interface FilterPopupProps {
  children: ReactElement;
  positionOption?: MovePositionOption;
}
