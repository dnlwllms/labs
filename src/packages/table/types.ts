import { MovePositionOption } from "@dnlwllms/util";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  SetStateAction,
} from "react";

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
  setClientData: Dispatch<SetStateAction<any>>;
  entryColumns: TableClientColumn[][];
  entryData: string[][][];
  appliedFilters: Array<AppliedFilter>;
  setAppliedFilters: Dispatch<SetStateAction<Array<AppliedFilter>>>;
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

export type AppliedFilter = {
  filterCondition: FilterCondition;
  column: TableColumn;
  filterValue: string;
};
