import { NumberUtility } from "./NumberUtility";
import { StringUtility } from "./StringUtility";

enum FieldType {
  STRING = 1,
  NUMBER,
  OBJECT,
  STRING_ARRAY,
  NUMBER_ARRAY,
}

const { getRandomNumber } = NumberUtility;
const { getRandomWord } = StringUtility;

export namespace ObjectUtility {
  export function getRandomObject(
    size = 10,
    fieldType?: FieldType | FieldType[]
  ): Record<string, unknown> {
    const object = Object.assign({});

    for (let i = 0; i < size; i++) {
      let type;
      if (Array.isArray(fieldType)) {
        type = fieldType[getRandomNumber(1, fieldType.length) - 1];
      } else {
        type = fieldType || getRandomNumber(1, 5);
      }
      let fieldName = getRandomWord().toLowerCase();

      // 중복 제거
      while (object[fieldName]) {
        fieldName = fieldName + getRandomNumber();
      }

      switch (type) {
        case FieldType.STRING:
          object[fieldName] = getRandomWord();
          break;
        case FieldType.NUMBER:
          object[fieldName] = getRandomNumber();
          break;
        case FieldType.OBJECT:
          object[fieldName] = getRandomObject(1);
          break;
        case FieldType.STRING_ARRAY:
          object[fieldName] = Array.from(
            { length: getRandomNumber(2, 5) },
            () => getRandomWord()
          );
          break;
        case FieldType.NUMBER_ARRAY:
          object[fieldName] = Array.from(
            { length: getRandomNumber(2, 5) },
            () => getRandomNumber()
          );
          break;
      }
    }

    return object;
  }
}
