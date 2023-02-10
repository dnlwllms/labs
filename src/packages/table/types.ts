import { MovePositionOption } from "@dnlwllms/util";
import { FC, PropsWithChildren, ReactElement, ReactNode } from "react";

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

export interface TableProps {
  children: (context: TableContextType) => ReactNode;
  columns: Array<TableColumn>;
  data: any;
}

export type TableContextType = {
  columns: TableColumn[];
  data: [];
  clientData: [];
  setClientData: (data: any) => void;
  entryColumns: TableClientColumn[][];
  entryData: string[][][];
};

export type InternalTable = {
  Head: FC<TableHeadProps>;
  Body: FC<TableBodyProps>;
};

export interface TableComponent extends FC<TableProps>, InternalTable {}

export interface TableHeadProps extends PropsWithChildren {}

export interface TableBodyProps extends PropsWithChildren {}

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
  children: (renderProps: { handleClose: () => void }) => ReactElement;
  positionOption?: MovePositionOption;
}
