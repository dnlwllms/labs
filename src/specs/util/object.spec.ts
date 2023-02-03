import { ObjectUtility, TestUtility } from "../../packages/util";

const { getRandomObject } = ObjectUtility;
const { call } = TestUtility;

describe("랜덤 객체 생성하기", () => {
  it("객체 생성 여부 확인", () => {
    call(100, () => {
      const object = getRandomObject();

      expect(Object.keys(object).length > 0).toEqual(true);
    });
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
    call(100, () => {
      const object = getRandomObject(10, [1, 2]);
      expect(
        Object.values(object).every(
          (field) => typeof field === "number" || typeof field === "string"
        )
      ).toEqual(true);
    });
  });
});
