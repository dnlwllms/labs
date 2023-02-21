export namespace CSSUtility {
  export function getViewSizeByPixel(px: number, maxWidth: number): number {
    return (100 / maxWidth) * px;
  }
}
