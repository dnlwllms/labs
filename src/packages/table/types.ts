import { MovePositionOption } from "@dnlwllms/util";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  SetStateAction,
} from "react";

/**
 * TODO
 * 추후 필터 및 엑셀 연동을 하기 위한 컬럼의 데이터 타입
 */
export type ColumnDataType = "string" | "date" | "number";

/**
 * TODO
 * 테이블, 필터 연동 시 필터 조건에 관련된 타입
 */
export type FilterCondition = "same" | "contain" | "more-then" | "less-then";

/**
 * 최상위 테이블 컴포넌트에 props로 전달되는 column의 객체 타입
 */
export interface TableColumn {
  /**
   * 컬럼의 고유 아이디
   */
  key: string;
  /**
   * 컬럼의 라벨
   */
  title: string;
  /**
   * 컬럼의 데이터 타입(필터, 엑셀 등에서 필요)
   */
  dataType?: ColumnDataType;
  /**
   * 컬럼의 가로 폭 크기
   */
  width?: number;
  /**
   * 2중 이상의 컬럼의 경우 하위 컬럼
   */
  children?: TableColumn[];
  /**
   * TODO 필터 옵션 관련
   */
  filter?: unknown;
}

/**
 * 테이블 컴포넌트 내부에서 클라이언트에서만 필요한 타입을 지정하기 위한 객체 타입
 */
export interface TableClientColumn extends TableColumn {
  colSpan: number;
}

/**
 * Table 컴포넌트 props type
 */
export interface TableProps {
  /**
   * renderProp 형태로 렌더단에서 context에 접근하기 위함.
   *
   * @param {TableContextType} context Table 컴포넌트 내부에서 사용되는 상태
   * @returns {ReactNode}
   */
  children: (context: TableContextType) => ReactNode;
  /**
   * TableColumn 객체 타입의 배열
   */
  columns: Array<TableColumn>;
  /**
   * 서버로부터 받아오는 raw data
   */
  data: any;
}

/**
 * table context 객체 타입
 */
export interface TableContextType {
  /**
   * input column
   */
  columns: TableColumn[];
  /**
   * input data (초기화 용도)
   */
  data: [];
  /**
   * display data (실제 클라이언트에서 참조하는 데이터)
   */
  clientData: [];
  /**
   * set display data (필터 적용 했을 때와 같은 상황)
   */
  setClientData: Dispatch<SetStateAction<any>>;
  /**
   * output column (column 객체를 클라이언트에서 사용하기 좋게 가공된 클라이언트용 column)
   */
  entryColumns: TableClientColumn[][];
  /**
   * output data (data 객체를 클라이언트에서 사용하기 좋게 가공된 클라이언트용 data)
   */
  entryData: string[][][];
  /**
   * 현재 적용된 필터 목록
   */
  appliedFilters: Array<AppliedFilter>;
  /**
   * 필터 적용 시 사용하는 dispatch
   */
  setAppliedFilters: Dispatch<SetStateAction<Array<AppliedFilter>>>;
}

/**
 * Table 내장 컴포넌트
 */
export interface InternalTable {
  Head: FC<TableHeadProps>;
  Body: FC<TableBodyProps>;
}

export interface TableComponent extends FC<TableProps>, InternalTable {}

export interface TableHeadProps extends PropsWithChildren {}

export interface TableBodyProps extends PropsWithChildren {}

/**
 * Filter 내장 컴포넌트
 */
export interface InternalFilter {
  Button: FC<FilterButtonProps>;
  Popup: FC<FilterPopupProps>;
}

export interface FilterComponent extends FC<FilterProps>, InternalFilter {}

export interface FilterProps extends PropsWithChildren {}

export interface FilterButtonProps {
  as?: ReactElement;
}

export interface FilterPopupProps {
  /**
   *
   * @param renderProps 필터에서 닫기 기능등, dialog 기능을 사용하기 위함
   * @returns
   */
  children: (renderProps: { handleClose: () => void }) => ReactElement;
  positionOption?: MovePositionOption;
}

/**
 * 현재 적용된 필터 객체 타입
 */
export interface AppliedFilter {
  filterCondition: FilterCondition;
  column: TableColumn;
  filterValue: string;
}
