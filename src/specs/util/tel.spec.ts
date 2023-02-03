import { NumberUtility, StringUtility } from "../../packages/util";
import { TestUtility } from "../../packages/util/TestUtility";

const { getTelNumber } = NumberUtility;
const { getRandomWord } = StringUtility;

const { getRandomNumber } = NumberUtility;

describe("전화번호 가져오기", () => {
  it("입력에 따라 제대로 변환 되는지 여부 - 숫자", () => {
    let input = "";
    TestUtility.call(11, () => {
      let regExp: RegExp;
      input += getRandomNumber(0, 9).toString();

      const number = input.replaceAll("-", "");
      switch (number.length) {
        case 1:
        case 2:
        case 3:
        case 4:
          regExp = /\d/;
          break;
        case 5:
          regExp = /\d{2}-\d{3}/;
          break;
        case 6:
          regExp = /\d{3}-\d{3}/;
          break;
        case 7:
          regExp = /\d{3}-\d{4}/;
          break;
        case 8:
          regExp = /\d{4}-\d{4}/;
          break;
        case 9:
          regExp = /\d{2}-\d{3}-\d{4}/;
          break;
        case 10:
          regExp = /\d{3}-\d{3}-\d{4}/;
          break;
        default:
          regExp = /\d{3}-\d{4}-\d{4}/;
          break;
      }

      const instance = new RegExp(regExp);
      input = getTelNumber(input);

      expect(instance.test(input)).toBe(true);
    });
  });

  it("입력에 따라 제대로 변환 되는지 여부 - 삭제", () => {
    let input = getTelNumber(
      getRandomNumber(0, 9).toString() +
        getRandomNumber(1000000000, 9999999999).toString()
    );

    TestUtility.call(10, () => {
      let regExp: RegExp;
      input = input.slice(0, input.length - 1);

      const number = input.replaceAll("-", "");
      switch (number.length) {
        case 1:
        case 2:
        case 3:
        case 4:
          regExp = /\d/;
          break;
        case 5:
          regExp = /\d{2}-\d{3}/;
          break;
        case 6:
          regExp = /\d{3}-\d{3}/;
          break;
        case 7:
          regExp = /\d{3}-\d{4}/;
          break;
        case 8:
          regExp = /\d{4}-\d{4}/;
          break;
        case 9:
          regExp = /\d{2}-\d{3}-\d{4}/;
          break;
        case 10:
          regExp = /\d{3}-\d{3}-\d{4}/;
          break;
        default:
          regExp = /\d{3}-\d{4}-\d{4}/;
          break;
      }

      const instance = new RegExp(regExp);
      input = getTelNumber(input);
      expect(instance.test(input)).toBe(true);
    });
  });

  it("입력에 따라 제대로 변환 되는지 여부 - 초과입력", () => {
    let input = "";
    TestUtility.call(20, () => {
      let regExp: RegExp;
      input += getRandomNumber(0, 9).toString();

      const number = input.replaceAll("-", "");
      switch (number.length) {
        case 1:
        case 2:
        case 3:
        case 4:
          regExp = /\d/;
          break;
        case 5:
          regExp = /\d{2}-\d{3}/;
          break;
        case 6:
          regExp = /\d{3}-\d{3}/;
          break;
        case 7:
          regExp = /\d{3}-\d{4}/;
          break;
        case 8:
          regExp = /\d{4}-\d{4}/;
          break;
        case 9:
          regExp = /\d{2}-\d{3}-\d{4}/;
          break;
        case 10:
          regExp = /\d{3}-\d{3}-\d{4}/;
          break;
        default:
          regExp = /\d{3}-\d{4}-\d{4}/;
          break;
      }

      const instance = new RegExp(regExp);
      input = getTelNumber(input);

      expect(instance.test(input)).toBe(true);
    });
    expect(input.length).toBe(13);
  });

  it("입력에 따라 제대로 변환 되는지 여부 - 문자입력", () => {
    let input = getRandomWord();
    TestUtility.call(20, () => {
      input += String.fromCharCode(getRandomNumber(65, 122));

      input = getTelNumber(input);

      expect(input).toBe("");
    });
  });
});
