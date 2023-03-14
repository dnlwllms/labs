import {
  Dispatch,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  TableHTMLAttributes,
} from "react";
import Body from "./Table/Body";
import Head from "./Table/Head";

/**
 * TODO
 * 추후 필터 및 엑셀 연동을 하기 위한 컬럼의 데이터 타입
 */
export type ColumnDataType = "string" | "date" | "number";

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
   * column 표시여부
   */
  isHide?: boolean;
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
  children?: (context: TableContextType) => ReactNode;

  /**
   * TableColumn 객체 타입의 배열
   */
  columns: Array<TableColumn>;

  /**
   * 서버로부터 받아오는 raw data
   */
  data: any;

  /**
   * default: id
   * row의 key로 사용할 column name
   */
  asKey?: string;

  /**
   * styled component 적용 시 필요
   */
  className?: string;
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
   * default: id
   * row의 key로 사용할 column name
   */
  asKey?: string;
}

/**
 * Table 내장 컴포넌트
 */
export interface InternalTable {
  Head: typeof Head;
  Body: typeof Body;
}

export interface TableComponent
  extends FC<TableProps>,
    InternalTable,
    TableHTMLAttributes<HTMLTableElement> {}

export interface TableHeadProps extends PropsWithChildren {
  fixed?: boolean;
}

export interface TableBodyProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLTableSectionElement> {}
