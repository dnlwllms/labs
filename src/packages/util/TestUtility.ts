export namespace TestUtility {
  export function call(count: number, callback: () => void) {
    for (let i = 0; i < count; i++) {
      callback();
    }
  }
}
