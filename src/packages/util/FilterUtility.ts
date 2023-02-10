export namespace FilterUtility {
  export function getFilteredDataByString<T = Array<Record<string, any>>>(
    data: Array<T>,
    key: keyof T,
    keyword: string,
    options?: {
      strict?: boolean;
    }
  ): Array<T> {
    if (options?.strict) {
      return data.filter((row) => row[key] === keyword);
    } else {
      return data.filter((row) => {
        const a = String(row[key]).toLowerCase();
        const b = keyword.toLowerCase();
        return a.includes(b);
      });
    }
  }

  export function getFilteredDataByNumber<T = Array<Record<string, any>>>(
    data: Array<T>,
    key: keyof T,
    keyword: string | number
  ): Array<T> {
    return data.filter((row) => row[key] === Number(keyword));
  }

  export function getFilteredDataByRange<
    T = Array<Record<string, any>>,
    U = number | Date
  >(data: Array<T>, key: keyof T, start: U, end: U): Array<T> {
    return data.filter((row) => start <= row[key] && row[key] <= end);
  }
}
