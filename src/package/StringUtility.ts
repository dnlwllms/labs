import { NumberUtility } from "./NumberUtility";

const { getRandomNumber } = NumberUtility;

type Paragraph = "lorem" | "names";

export namespace StringUtility {
  /**
   *
   * @returns string paragraph
   */
  export function getStringParagragh(stringContext: Paragraph = "lorem") {
    switch (stringContext) {
      case "lorem":
        return `
        What is Lorem Ipsum?
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        Why do we use it?
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        Where does it come from?
        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
        Where can I get some?
        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
        `;

      case "names":
        return ` African Albanian Arabic Armenian Azerbaijani Basque Belarusian Bengali Bosnian Breton Bulgarian Catalan Chinese Croatian Czech Danish Dutch English Estonian Finnish French Frisian Galician Georgian German Greek Hausa Hawaiian Hebrew Hungarian Icelandic Igbo Indian Indonesian Irish Italian Japanese Kazakh Khmer Korean Latvian Limburgish Lithuanian Macedonian Malay Maori Native  American Nepali Norwegian Persian Polish Portuguese Romanian Russian Scottish Serbian Slovak Slovene Spanish Swahili Swedish Thai Turkish Ukrainian Urdu Vietnamese Welsh Yoruba Zulu Mythology Celtic Egyptian Greek Near Eastern Norse Roman   Ancient Anglo-Saxon Celtic Germanic Greek Norse Roman   Arthurian Biblical Hinduism Theology Whimsical Fairy Goth Hillbilly Hippy Kreatyve Rapper Transformer Witch Wrestler   Fantasy Gluttakh Monstrall Romanto Simitiq Tsang Xalaxxi`;

      default:
        return "";
    }
  }

  /**
   * 랜덤 단어 반환
   *
   * ###dependency
   * - getLorem
   * - getRandomNumber
   *
   * @param context 단어를 추출할 본문
   * @returns context 단어 중 한개 반환
   */
  export function getRandomWord(context?: string) {
    // 엔터 및 여백 삭제 후 배열로 변환
    let strings = (context || getStringParagragh())
      .replace("\n", "")
      .trim()
      .split(" ");

    // 빈 문자열 삭제
    strings = strings.filter((word) => word.length > 0);

    let word = strings[getRandomNumber(0, strings.length - 1)];

    // 영어 알파벳만 추출
    let arr = word.split("");
    arr = arr.filter(
      (char) => 65 <= char.charCodeAt(0) && char.charCodeAt(0) <= 122
    );

    // 전부 추출되어서 비어있을경우 해당 단어 제외 후 다시 탐색
    if (arr.length === 0) {
      const filtered = strings.filter((string) => string !== word);
      if (filtered.length === 0) {
        return "word";
      }
      word = getRandomWord(filtered.join(" "));
      return word;
    }

    word = arr.join("");

    return word;
  }
}
