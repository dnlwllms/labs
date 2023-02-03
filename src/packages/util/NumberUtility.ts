export namespace NumberUtility {
  /**
   * 랜덤 숫자 a, b를 크기가 작은순으로 리턴
   *
   * @param a 시작값
   * @param b 종료값
   * @returns [start, end]
   */
  export function arrangeRandoms(a: number, b: number) {
    let small = Number(a),
      big = Number(b);

    if (small > big) {
      small = b;
      big = a;
    }

    return [small, big];
  }

  /**
   * @param a 시작값
   * @param b 종료값
   * @param options
   *  <br />
   * - fixed: 소수점 자리수
   * @return a, b 사이에 랜덤 숫자를 반환한다. fixed option 기본값은 0
   */
  export function getRandomNumber(a = 0, b = 100, fixed = 0) {
    const [start, end] = arrangeRandoms(a, b);

    // 0 ~ 1
    let random = Math.random();

    // 0 ~ (b - a)
    random *= end - start;

    // a ~ b
    random += start;

    //
    random = Math.round(random * Math.pow(10, fixed));
    random = random * Math.pow(10, -fixed);

    return Number(random.toFixed(fixed));
  }
}

/**
 * @param inputString 입력되는 값
 *
 * @return 전화번호 형태에 맞게 String 반환
 */
export function getTelNumber(inputString: string) {
  let withoutHypen = inputString.replaceAll("-", "");

  if (Number.isNaN(Number(withoutHypen))) {
    return "";
  }

  if (withoutHypen.length > 11) {
    withoutHypen = withoutHypen.slice(0, 11);
  }

  switch (withoutHypen.length) {
    case 1:
    case 2:
    case 3:
    case 4:
      return withoutHypen;
    case 5:
    case 6:
      return withoutHypen.replace(/(\d{2,3})(\d{3})/, "$1-$2");
    case 7:
    case 8:
      return withoutHypen.replace(/(\d{3,4})(\d{4})/, "$1-$2");
    case 9:
      return withoutHypen.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
    case 10:
    case 11:
      return withoutHypen.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
    default:
      return inputString;
  }
}
