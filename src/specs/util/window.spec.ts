import { NumberUtility, Viewport, WindowUtility } from "../../packages/util";

const { getIsWidthOver, getIsHeightOver } = WindowUtility;
const { getRandomNumber } = NumberUtility;

describe("Window Viewport Test", () => {
  // 가상 뷰포트 생성
  const viewport: Viewport = {
    width: getRandomNumber(800, 1200),
    height: getRandomNumber(500, 800),
  };

  // 가상 DOMRect 생성
  const width = getRandomNumber(300, 500),
    height = getRandomNumber(300, 500),
    top = getRandomNumber(0, viewport.height),
    bottom = viewport.height - top - height,
    left = getRandomNumber(0, viewport.width),
    right = viewport.width - left - width;
  const rect: DOMRect = {
    width,
    height,
    top,
    bottom,
    left,
    right,
    x: left,
    y: top,
    toJSON: () => {},
  };

  it("x축 이탈 여부 테스트", () => {
    expect(rect.width + rect.x >= viewport.width).toBe(
      getIsWidthOver(viewport.width, rect)
    );
  });

  it("y축 이탈 여부 테스트", () => {
    expect(rect.height + rect.y >= viewport.height).toBe(
      getIsHeightOver(viewport.height, rect)
    );
  });
});
