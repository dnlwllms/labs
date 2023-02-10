import { MovePositionOption, Position, Viewport } from "./types";

export namespace WindowUtility {
  export function getIsWidthOver(
    viewportWidth: number,
    rect: DOMRect
  ): boolean {
    return rect.x + rect.width >= viewportWidth;
  }

  export function getIsHeightOver(
    viewportHeight: number,
    rect: DOMRect
  ): boolean {
    return rect.y + rect.height >= viewportHeight;
  }

  export function getIsInViewport(viewport: Viewport, rect: DOMRect) {
    return (
      !getIsWidthOver(viewport.width, rect) &&
      !getIsHeightOver(viewport.height, rect)
    );
  }

  /**
   *
   * @param {Viewport} viewport window.innerWidth, window.innerHeight
   * @param {HTMLElement} element 오버레이할 엘리멘트
   * @param {Position} position 트리거의 위치(offsetTop, offsetLeft)
   * @param {MovePositionOption} options 기타 간격 조정 등
   */
  export function movePositionIntoViewport(
    viewport: Viewport,
    element: HTMLElement,
    position: Position,
    options?: MovePositionOption
  ) {
    let elementRect = element.getBoundingClientRect();

    if (getIsWidthOver(viewport.width, elementRect)) {
      element.style.left = `${position.left - (options?.rightMargin || 0)}px`;
    } else {
      element.style.left = `${position.left + (options?.leftMargin || 0)}px`;
    }

    elementRect = element.getBoundingClientRect();

    if (getIsHeightOver(viewport.height, elementRect)) {
      element.style.top = `${
        position.top - elementRect.height + (options?.bottomMargin || 0)
      }px`;
    } else {
      element.style.top = `${position.top + (options?.topMargin || 0)}px`;
    }
  }
}
