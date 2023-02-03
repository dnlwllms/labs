import { StringUtility, TestUtility } from "../../packages/util";

const { getRandomWord } = StringUtility;
const { call } = TestUtility;

describe("본문에서 아무 단어나 가져오기", () => {
  it("본문이 없을 경우", () => {
    call(100, () => {
      const randomWord = getRandomWord();
      expect(typeof randomWord === "string").toEqual(true);
    });
  });

  it("소문자로 가져오기", () => {
    call(100, () => {
      const randomWord = getRandomWord().toLowerCase();
      expect(
        randomWord.length > 0 &&
          randomWord
            .split("")
            .every(
              (char) => 97 <= char.charCodeAt(0) && char.charCodeAt(0) <= 122
            )
      ).toEqual(true);
    });
  });

  it("대문자로 가져오기", () => {
    call(100, () => {
      const randomWord = getRandomWord().toUpperCase();

      expect(
        randomWord.length > 0 &&
          randomWord
            .split("")
            .every(
              (char) => 65 <= char.charCodeAt(0) && char.charCodeAt(0) <= 96
            )
      ).toEqual(true);
    });
  });

  it("잘못된 컨텍스트에서 가져오기", () => {
    const randomWord = getRandomWord("1.1.1 12312421 ,!@#$!  ");
    expect(randomWord.length > 0).toEqual(true);
  });
});
