import { NumberUtility, TestUtility } from "../../packages/util";

const { arrangeRandoms, getRandomNumber } = NumberUtility;
const { call } = TestUtility;
describe("랜덤 숫자 가져오기", () => {
  const testActionWithoutParams = () => {
    const randomNumber = getRandomNumber();

    expect(0 <= randomNumber && randomNumber <= 100).toEqual(true);
  };

  it("설정값 없을 때", () => {
    call(100, () => {
      testActionWithoutParams();
    });
  });
});

describe("랜덤 숫자 가져오기 2", () => {
  const testAction = (fixed = 0) => {
    const a = getRandomNumber(-1000, 1000, fixed);
    const b = getRandomNumber(-1000, 1000, fixed);

    const [start, end] = arrangeRandoms(a, b);

    const randomNumber = getRandomNumber(start, end, fixed);

    expect(start <= randomNumber && randomNumber <= end).toEqual(true);
  };

  it("범위 안에 유효한 정수 반환 여부", () => {
    testAction();
  });

  it("범위 안에 유효한 실수(소수점 두번째 자리) 반환 여부", () => {
    testAction(2);
  });

  it("100번 시도 성공 여부", () => {
    call(100, () => {
      testAction(getRandomNumber(0, 6) << 0);
    });
  });
});
