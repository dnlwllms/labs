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
