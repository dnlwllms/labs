import { NumberUtility, TestUtility, WindowUtility } from "../../packages/util";

const { getRandomNumber } = NumberUtility;
const {
  getIsInViewport,
  getIsOverX,
  getIsOverY,
  getMovedCoordinateIntoViewport,
} = WindowUtility;
const { call } = TestUtility;

describe("Window Viewport Test", () => {
  // 가상 Target의 사이즈 초기화
  const rectWidth = getRandomNumber(100, 300);
  const rectHeight = getRandomNumber(100, 300);
  // Window Viewport 최소, 최대 크기
  const min = 800;
  const max = 1200;
  // 가상 Window Viewport 사이즈
  const innerWidth = getRandomNumber(min, max);
  const innerHeight = getRandomNumber(min, max);

  it("가상 viewport 생성 테스트", () => {
    expect(
      min <= innerWidth &&
        innerWidth <= max &&
        min <= innerHeight &&
        innerHeight <= max
    ).toBe(true);
  });

  it("가상 Rect 생성 테스트", () => {
    call(100, () => {
      const x = getRandomNumber(0, min - rectWidth),
        y = getRandomNumber(0, min - rectHeight);

      let rect: DOMRect = {
        x,
        y,
        width: rectWidth,
        height: rectHeight,
        left: x,
        top: y,
        right: innerWidth - x - rectWidth,
        bottom: innerHeight - y - rectHeight,
        toJSON: () => {},
      };

      expect(getIsInViewport({ innerWidth, innerHeight }, rect)).toBe(true);
    });
  });

  it("x, y 둘 다 이탈 시 getIsInViewport 테스트", () => {
    call(100, () => {
      const x = getRandomNumber(
          innerWidth - rectWidth + 1,
          innerWidth + rectWidth
        ),
        y = getRandomNumber(
          innerHeight - rectHeight + 1,
          innerHeight + rectHeight
        );

      let rect: DOMRect = {
        x,
        y,
        width: rectWidth,
        height: rectHeight,
        left: x,
        top: y,
        right: innerWidth - x - rectWidth,
        bottom: innerHeight - y - rectHeight,
        toJSON: () => {},
      };

      expect(getIsInViewport({ innerWidth, innerHeight }, rect)).toBe(false);
    });
  });

  it("x축만 이탈 시 getIsOverX, getIsOverY 테스트", () => {
    call(100, () => {
      const x = getRandomNumber(
          innerWidth - rectWidth + 1,
          innerWidth + rectWidth
        ),
        y = getRandomNumber(0, innerHeight - rectHeight);

      let rect: DOMRect = {
        x,
        y,
        width: rectWidth,
        height: rectHeight,
        left: x,
        top: y,
        right: innerWidth - x + rectWidth,
        bottom: innerHeight - y + rectHeight,
        toJSON: () => {},
      };

      expect(getIsOverX(innerWidth, rect)).toBe(true);
      expect(getIsOverY(innerHeight, rect)).toBe(false);

      expect(getIsInViewport({ innerWidth, innerHeight }, rect)).toBe(false);
    });
  });

  it("y축만 이탈 시 getIsOverX, getIsOverY 테스트", () => {
    call(100, () => {
      const x = getRandomNumber(0, innerWidth - rectWidth),
        y = getRandomNumber(
          innerHeight - rectHeight + 1,
          innerHeight + rectHeight
        );

      let rect: DOMRect = {
        x,
        y,
        width: rectWidth,
        height: rectHeight,
        left: x,
        top: y,
        right: innerWidth - x + rectWidth,
        bottom: innerHeight - y + rectHeight,
        toJSON: () => {},
      };

      expect(getIsOverX(innerWidth, rect)).toBe(false);
      expect(getIsOverY(innerHeight, rect)).toBe(true);

      expect(getIsInViewport({ innerWidth, innerHeight }, rect)).toBe(false);
    });
  });

  it("x축 이탈시 viewport 안으로 이동 테스트", () => {
    call(100, () => {
      const x = getRandomNumber(
          innerWidth - rectWidth + 1,
          innerWidth + rectWidth
        ),
        y = getRandomNumber(0, innerHeight - rectHeight);

      let rect: DOMRect = {
        x,
        y,
        width: rectWidth,
        height: rectHeight,
        left: x,
        top: y,
        right: innerWidth - x + rectWidth,
        bottom: innerHeight - y + rectHeight,
        toJSON: () => {},
      };

      expect(getIsOverX(innerWidth, rect)).toBe(true);

      const movedRect = getMovedCoordinateIntoViewport(
        { innerWidth, innerHeight },
        rect
      );

      expect(getIsInViewport({ innerWidth, innerHeight }, movedRect)).toBe(
        true
      );
    });
  });

  it("y축 이탈시 viewport 안으로 이동 테스트", () => {
    call(100, () => {
      const x = getRandomNumber(0, innerWidth - rectWidth),
        y = getRandomNumber(
          innerHeight - rectHeight + 1,
          innerHeight + rectHeight
        );

      let rect: DOMRect = {
        x,
        y,
        width: rectWidth,
        height: rectHeight,
        left: x,
        top: y,
        right: innerWidth - x + rectWidth,
        bottom: innerHeight - y + rectHeight,
        toJSON: () => {},
      };

      expect(getIsOverY(innerHeight, rect)).toBe(true);

      const movedRect = getMovedCoordinateIntoViewport(
        { innerWidth, innerHeight },
        rect
      );

      expect(getIsInViewport({ innerWidth, innerHeight }, movedRect)).toBe(
        true
      );
    });
  });
});
