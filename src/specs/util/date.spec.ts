import { DateUtility, TestUtility, UtilError } from "../../packages/util";

const { getRandomDate } = DateUtility;
const { call } = TestUtility;

describe("랜덤 날짜 생성하기", () => {
  it("날짜 범위 잘못 입력했을 때 확인하기", () => {
    expect(() => getRandomDate([new Date(), new Date("2021-01-01")])).toThrow(
      UtilError
    );
  });

  it("날짜 생성 - 같은 날인 경우", () => {
    call(100, () => {
      const startDate = new Date("2021-01-01T00:00:00");
      const endDate = new Date("2021-01-01T23:59:59");
      const randomDate = getRandomDate([startDate, endDate]);

      expect(randomDate >= startDate && randomDate <= endDate).toBe(true);
    });
  });

  it("날짜 생성 - 같은 달인 경우", () => {
    call(100, () => {
      const startDate = new Date("2021-01-01");
      const endDate = new Date("2021-01-31");
      const randomDate = getRandomDate([startDate, endDate]);

      expect(randomDate >= startDate && randomDate <= endDate).toBe(true);
    });
  });

  it("날짜 생성 - 같은 해인 경우", () => {
    call(100, () => {
      const startDate = new Date("2021-01-01");
      const endDate = new Date("2021-12-31");
      const randomDate = getRandomDate([startDate, endDate]);

      expect(randomDate >= startDate && randomDate <= endDate).toBe(true);
    });
  });

  it("날짜 생성 - 연도만 다를 경우", () => {
    call(100, () => {
      const startDate = new Date("2021-01-01");
      const endDate = new Date("2022-01-01");
      const randomDate = getRandomDate([startDate, endDate]);

      expect(randomDate >= startDate && randomDate <= endDate).toBe(true);
    });
  });
});
