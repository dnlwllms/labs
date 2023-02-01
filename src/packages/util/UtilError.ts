type UtilErrorType = "invalid-value" | "invalid-range";

export class UtilError extends Error {
  constructor(type: UtilErrorType, ...params: any) {
    super(...params);

    switch (type) {
      case "invalid-range":
        this.name = "InvalidRangeError";
        this.message = "잘못된 범위 입니다.";
        break;
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UtilError);
    }
  }
}
