/**
 * Window 객체에 있는 innerWidth, innerHeight
 */
export type Viewport = {
  width: number;
  height: number;
};

/**
 * 문서에서 실제 위치(rect는 viewport기준, position은 문서 크기 기준)
 */
export type Position = {
  top: number;
  left: number;
};

export type MovePositionOption = {
  topMargin?: number;
  leftMargin?: number;
  rightMargin?: number;
  bottomMargin?: number;
};
