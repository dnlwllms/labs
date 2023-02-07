export namespace WindowUtility {
  /**
   * Window 객체에 있는 innerWidth, innerHeight
   */
  export type WindowSize = {
    innerWidth: number;
    innerHeight: number;
  };

  /**
   * DOMRect 객체의 좌표
   */
  export type Coordinate = { x: number; y: number };

  /**
   * 두 번째 인자인 DOMRect 객체가 첫 번째 인자인 window 객체 사이즈 안에 있는지 여부
   * @param {WindowSize} windowSize
   * @param {DOMRect} domRect
   * @returns {boolean}
   * @example
   * ```typescript
   * useEffect(() => {
   *  window.addEventListener("click", (e) => {
   *    const target = e.target as HTMLElement;
   *    const domRect = e.target.getBoundingClientRect();
   *    const windowSize: WindowSize = {
   *      innerWidth: window.innerWidth,
   *      innerHeight: widnow.innerHeight,
   *    }
   *    getIsInViewport(windowSize, domRect);
   *  })
   * }, [])
   * ```
   */
  export function getIsInViewport(
    windowSize: WindowSize,
    domRect: DOMRect
  ): boolean {
    return (
      windowSize.innerWidth >= domRect.width + domRect.x &&
      windowSize.innerHeight >= domRect.height + domRect.y
    );
  }

  /**
   * Viewport 안에 있지 않을 때 x축 이탈 여부
   * @param {number} innerWidth
   * @param {DOMRect} domRect
   * @returns {boolean}
   * @example
   * ```typescript
   * useEffect(() => {
   *  window.addEventListener("click", (e) => {
   *    const target = e.target as HTMLElement;
   *    const domRect = e.target.getBoundingClientRect();
   *
   *    getIsOverX(window.innerWidth, domRect);
   *  })
   * }, [])
   * ```
   */
  export function getIsOverX(innerWidth: number, domRect: DOMRect): boolean {
    return innerWidth < domRect.width + domRect.x;
  }

  /**
   * Viewport 안에 있지 않을 때 y축 이탈 여부
   * @param {number} innerHeight
   * @param {DOMRect} domRect
   * @returns {boolean}
   * @example
   * ```typescript
   * useEffect(() => {
   *  window.addEventListener("click", (e) => {
   *    const target = e.target as HTMLElement;
   *    const domRect = e.target.getBoundingClientRect();
   *
   *    getIsOverX(window.innerHeight, domRect);
   *  })
   * }, [])
   * ```
   */
  export function getIsOverY(innerHeight: number, domRect: DOMRect): boolean {
    return innerHeight < domRect.height + domRect.y;
  }

  /**
   * 이탈 여부를 체크해서 Viewport 안으로 이동된 x,y 좌표값 반환
   * @param {WindowSize} windowSize
   * @param {DOMRect} domRect
   * @returns {Coordinate}
   * @example
   * ```typescript
   * useEffect(() => {
   *  window.addEventListener("click", (e) => {
   *    const target = e.target as HTMLElement;
   *    const domRect = e.target.getBoundingClientRect();
   *    const windowSize: WindowSize = {
   *      innerWidth: window.innerWidth,
   *      innerHeight: widnow.innerHeight,
   *    }
   *    getMovedCoordinateIntoViewport(windowSize, domRect);
   *  })
   * }, [])
   * ```
   */
  export function getMovedCoordinateIntoViewport(
    windowSize: WindowSize,
    domRect: DOMRect
  ): DOMRect {
    const isOverX = getIsOverX(windowSize.innerWidth, domRect);
    const isOverY = getIsOverY(windowSize.innerHeight, domRect);

    const movedCooridnate: Coordinate = {
      x: domRect.x,
      y: domRect.y,
    };

    if (isOverX) {
      const moveDistance = windowSize.innerWidth - domRect.width + domRect.x;
      movedCooridnate.x -= moveDistance;
    }

    if (isOverY) {
      const moveDistance = windowSize.innerHeight - domRect.height + domRect.y;
      movedCooridnate.y -= moveDistance;
    }

    const movedDomRect: DOMRect = {
      width: domRect.width,
      height: domRect.height,
      x: movedCooridnate.x,
      y: movedCooridnate.y,
      left: movedCooridnate.x,
      top: movedCooridnate.y,
      right: windowSize.innerWidth - domRect.width + movedCooridnate.x,
      bottom: windowSize.innerHeight - domRect.height + movedCooridnate.y,
      toJSON: () => {},
    };

    return movedDomRect;
  }
}
