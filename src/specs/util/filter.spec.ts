import {
  DateUtility,
  FieldType,
  FilterUtility,
  NumberUtility,
  ObjectUtility,
  StringUtility,
  TestUtility,
} from "../../packages/util";

const { getRandomWord } = StringUtility;
const { getRandomObject } = ObjectUtility;
const { getRandomNumber } = NumberUtility;
const { call } = TestUtility;
const {
  getFilteredDataByString,
  getFilteredDataByNumber,
  getFilteredDataByRange,
} = FilterUtility;

const { getIsDate, getRandomDate } = DateUtility;

describe("문자열 필터 테스트", () => {
  const stringArr: string[] = [];
  it("문자열 배열에 단어 100개 할당", () => {
    call(100, () => {
      stringArr.push(getRandomWord());
    });

    expect(stringArr.length === 100).toBe(true);
  });

  it("문자열 배열 중 특정 키워드로 필터", () => {
    call(100, () => {
      const keyword = getRandomWord();
      const filtered = stringArr.filter((string) => string === keyword);

      expect(filtered.every((string) => string === keyword)).toBe(true);
    });
  });

  it("getFilteredDataByString - 약한 검사", () => {
    const data: Array<Record<string, unknown>> = [];

    const row = getRandomObject(getRandomNumber(), [
      FieldType.STRING,
      FieldType.NUMBER,
    ]);
    let stringTypekeys = Object.keys(row);
    let stringTypeRandomKey =
      stringTypekeys[getRandomNumber(0, stringTypekeys.length - 1)];
    let keyword = getRandomWord();

    call(getRandomNumber(), () => {
      stringTypekeys = Object.keys(row).filter(
        (key) => typeof row[key] === "string"
      );
      if (stringTypekeys.length) {
        stringTypeRandomKey =
          stringTypekeys[getRandomNumber(0, stringTypekeys.length - 1)];
        keyword = getRandomWord();

        row[stringTypeRandomKey] = keyword;
        data.push(row);
      }
    });

    const filtered = getFilteredDataByString(
      data,
      stringTypeRandomKey,
      keyword
    );

    expect(
      filtered.every((row) =>
        String(row[stringTypeRandomKey]).includes(keyword)
      )
    ).toBe(true);
  });

  it("getFilteredDataByString - 강한 검사", () => {
    const data: Array<Record<string, unknown>> = [];

    const row = getRandomObject(getRandomNumber(), [
      FieldType.STRING,
      FieldType.NUMBER,
    ]);
    let stringTypekeys = Object.keys(row);
    let stringTypeRandomKey =
      stringTypekeys[getRandomNumber(0, stringTypekeys.length - 1)];
    let keyword = getRandomWord();

    call(getRandomNumber(), () => {
      stringTypekeys = Object.keys(row).filter(
        (key) => typeof row[key] === "string"
      );
      if (stringTypekeys.length) {
        stringTypeRandomKey =
          stringTypekeys[getRandomNumber(0, stringTypekeys.length - 1)];
        keyword = getRandomWord();

        row[stringTypeRandomKey] = keyword;
        data.push(row);
      }
    });

    const filtered = getFilteredDataByString(
      data,
      stringTypeRandomKey,
      keyword,
      {
        strict: true,
      }
    );

    expect(
      filtered.every((row) => String(row[stringTypeRandomKey]) === keyword)
    ).toBe(true);
  });

  it("getFilteredDataByNumber", () => {
    const data: Array<Record<string, unknown>> = [];

    const row = getRandomObject(getRandomNumber(), [
      FieldType.STRING,
      FieldType.NUMBER,
    ]);
    let numberTypekeys = Object.keys(row).filter(
      (key) => typeof row[key] === "number"
    );
    let numberTypeRandomKey =
      numberTypekeys[getRandomNumber(0, numberTypekeys.length - 1)];
    let keyword = row[numberTypeRandomKey];

    call(getRandomNumber(), () => {
      numberTypekeys = Object.keys(row).filter(
        (key) => typeof row[key] === "number"
      );
      if (numberTypekeys.length) {
        numberTypeRandomKey =
          numberTypekeys[getRandomNumber(0, numberTypekeys.length - 1)];
        keyword = getRandomNumber();

        row[numberTypeRandomKey] = keyword;
        data.push(row);
      }
    });

    const filtered = getFilteredDataByNumber(
      data,
      numberTypeRandomKey,
      Number(keyword)
    );

    expect(
      filtered.every((row) => Number(row[numberTypeRandomKey]) === keyword)
    ).toBe(true);
  });

  it("getFilteredDataByRange - Date 타입인 경우", () => {
    const data: Array<Record<string, unknown>> = [];

    const row = getRandomObject(getRandomNumber(), [
      FieldType.STRING,
      FieldType.NUMBER,
      FieldType.DATE,
    ]);
    let dateTypekeys = Object.keys(row).filter((key) => getIsDate(row[key]));
    let dateTypeRandomKey =
      dateTypekeys[getRandomNumber(0, dateTypekeys.length - 1)];
    let keyword = row[dateTypeRandomKey];

    call(getRandomNumber(), () => {
      dateTypekeys = Object.keys(row).filter((key) => getIsDate(row[key]));
      if (dateTypekeys.length) {
        dateTypeRandomKey =
          dateTypekeys[getRandomNumber(0, dateTypekeys.length - 1)];
        keyword = getRandomDate();

        row[dateTypeRandomKey] = keyword;
        data.push(row);
      }
    });

    const startDate = new Date("2022-01-01");
    const endDate = new Date("2022-02-01");

    const filtered = getFilteredDataByRange(
      data,
      dateTypeRandomKey,
      startDate,
      endDate
    );

    const target = row[dateTypeRandomKey] as Date;

    expect(
      filtered.every((row) => startDate <= target && target <= endDate)
    ).toBe(true);
  });
});
