import { NumberUtility } from "./NumberUtility";

const { getRandomNumber } = NumberUtility;

export namespace DateUtility {
  export function getTimeString(num: number) {
    if (num < 10) {
      return `0${num}`;
    }

    return num;
  }
  export function getRandomDate() {
    return `${getRandomNumber(2020, 2023)}-${getTimeString(
      getRandomNumber(1, 12)
    )}-${getTimeString(getRandomNumber(1, 28))}T${getTimeString(
      getRandomNumber(0, 23)
    )}:${getTimeString(getRandomNumber(0, 59))}:${getTimeString(
      getRandomNumber(0, 59)
    )}`;
  }
}
