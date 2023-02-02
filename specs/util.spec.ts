import {
  DateUtility,
  NumberUtility,
  ObjectUtility,
  StringUtility,
} from "../packages/util";
import { TestUtility } from "../packages/util/TestUtility";
import { UtilError } from "../packages/util/UtilError";

const { arrangeRandoms, getRandomNumber } = NumberUtility;
const { getRandomWord } = StringUtility;
const { getRandomObject } = ObjectUtility;
const { getRandomDate } = DateUtility;

describe("랜덤 숫자 가져오기", () => {
  const testActionWithoutParams = () => {
    const randomNumber = getRandomNumber();

    expect(0 <= randomNumber && randomNumber <= 100).toEqual(true);
  };

  it("설정값 없을 때", () => {
    for (let i = 0; i < 100; i++) {
      testActionWithoutParams();
    }
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
    TestUtility.call(100, () => {
      testAction(getRandomNumber(0, 6) << 0);
    });
  });
});

describe("본문에서 아무 단어나 가져오기", () => {
  it("본문이 없을 경우", () => {
    for (let i = 1; i < 100; i++) {
      const randomWord = getRandomWord();
      expect(typeof randomWord === "string").toEqual(true);
    }
  });

  it("소문자로 가져오기", () => {
    for (let i = 1; i < 100; i++) {
      const randomWord = getRandomWord().toLowerCase();
      expect(
        randomWord.length > 0 &&
          randomWord
            .split("")
            .every(
              (char) => 97 <= char.charCodeAt(0) && char.charCodeAt(0) <= 122
            )
      ).toEqual(true);
    }
  });

  it("대문자로 가져오기", () => {
    for (let i = 1; i < 100; i++) {
      const randomWord = getRandomWord().toUpperCase();

      expect(
        randomWord.length > 0 &&
          randomWord
            .split("")
            .every(
              (char) => 65 <= char.charCodeAt(0) && char.charCodeAt(0) <= 96
            )
      ).toEqual(true);
    }
  });

  it("잘못된 컨텍스트에서 가져오기", () => {
    const randomWord = getRandomWord("1.1.1 12312421 ,!@#$!  ");
    expect(randomWord.length > 0).toEqual(true);
  });
});

describe("랜덤 객체 생성하기", () => {
  it("객체 생성 여부 확인", () => {
    for (let i = 0; i < 100; i++) {
      const object = getRandomObject();

      expect(Object.keys(object).length > 0).toEqual(true);
    }
  });

  it("사이즈 입력해서 가져오기", () => {
    const object = getRandomObject(20);

    expect(Object.keys(object).length === 20).toEqual(true);
  });

  it("문자 타입만 만들기", () => {
    const object = getRandomObject(10, 1);

    expect(
      Object.values(object).every((field) => typeof field === "string")
    ).toEqual(true);
  });

  it("숫자 타입만 만들기", () => {
    const object = getRandomObject(10, 2);

    expect(
      Object.values(object).every((field) => typeof field === "number")
    ).toEqual(true);
  });

  it("문자나 숫자로 타입 만들기", () => {
    for (let i = 0; i < 100; i++) {
      const object = getRandomObject(10, [1, 2]);
      expect(
        Object.values(object).every(
          (field) => typeof field === "number" || typeof field === "string"
        )
      ).toEqual(true);
    }
  });
});

describe("랜덤 날짜 생성하기", () => {
  it("날짜 범위 잘못 입력했을 때 확인하기", () => {
    expect(() => getRandomDate([new Date(), new Date("2021-01-01")])).toThrow(
      UtilError
    );
  });

  it("날짜 생성 - 같은 날인 경우", () => {
    TestUtility.call(100, () => {
      const startDate = new Date("2021-01-01T00:00:00");
      const endDate = new Date("2021-01-01T23:59:59");
      const randomDate = getRandomDate([startDate, endDate]);

      expect(randomDate >= startDate && randomDate <= endDate).toBe(true);
    });
  });

  it("날짜 생성 - 같은 달인 경우", () => {
    TestUtility.call(100, () => {
      const startDate = new Date("2021-01-01");
      const endDate = new Date("2021-01-31");
      const randomDate = getRandomDate([startDate, endDate]);

      expect(randomDate >= startDate && randomDate <= endDate).toBe(true);
    });
  });

  it("날짜 생성 - 같은 해인 경우", () => {
    TestUtility.call(100, () => {
      const startDate = new Date("2021-01-01");
      const endDate = new Date("2021-12-31");
      const randomDate = getRandomDate([startDate, endDate]);

      expect(randomDate >= startDate && randomDate <= endDate).toBe(true);
    });
  });

  it("날짜 생성 - 연도만 다를 경우", () => {
    TestUtility.call(100, () => {
      const startDate = new Date("2021-01-01");
      const endDate = new Date("2022-01-01");
      const randomDate = getRandomDate([startDate, endDate]);

      expect(randomDate >= startDate && randomDate <= endDate).toBe(true);
    });
  });
});
