import { FC, useEffect, useRef } from "react";
import Form, { useForm } from "./packages/form";
import { NumberUtility, StringUtility, DateUtility } from "./packages/util";
import Table, { TableColumn } from "./packages/table";
import Dialog from "./packages/dialog";

const { getRandomNumber } = NumberUtility;
const { getRandomWord, getStringParagragh } = StringUtility;
const { getRandomDate } = DateUtility;

type TestData = {
  id: number;
  name: string;
  age: number;
  gender: string;
  nickname: string;
  memo: string;
  createdAt: string;
};

function App() {
  const columns: TableColumn[] = [
    {
      key: "personalInfo",
      title: "개인정보",
      children: [
        {
          key: "id",
          title: "아이디",
          isHide: true,
        },
        {
          key: "name",
          title: "이름",
          width: 100,
        },
        {
          key: "age",
          title: "연령",
          width: 100,
        },
        {
          key: "gender",
          title: "성별",
          width: 100,
        },
      ],
    },
    {
      key: "personalInfo2",
      title: "부가정보",
      children: [
        {
          key: "nickname",
          title: "닉네임",
          width: 100,
        },
        {
          key: "memo",
          title: "메모",
          width: 100,
        },
        {
          key: "createdAt",
          title: "생성일",
          width: 100,
        },
      ],
    },
  ];

  const data: TestData[] = Array.from({ length: 100 }).map((_, index) => {
    return {
      id: index,
      name: getRandomWord(getStringParagragh("names")),
      age: getRandomNumber(15, 50),
      gender: getRandomNumber() % 2 === 0 ? "male" : "female",
      nickname: getRandomWord(getStringParagragh("names")),
      memo: getRandomWord(),
      createdAt: getRandomDate().toISOString(),
    };
  });

  return <div></div>;
}

export default App;

interface FilterFormProps {
  columnKey: string;
  data: any[];
  onSubmit: (filteredData: any[], values: any) => void;
}

const FilterForm: FC<FilterFormProps> = ({ columnKey, data, onSubmit }) => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);
  const filterForm = useForm({
    initialValues: {
      keyword: "",
    },
  });

  return (
    <Form
      form={filterForm}
      onSubmit={(values) => {
        if (values.keyword) {
          const filteredData = data.filter((item) => {
            const typedKey = columnKey as keyof TestData;
            return String(item[typedKey])
              .toLowerCase()
              .includes(values.keyword.toLowerCase());
          });
          onSubmit(filteredData, values);
        }
      }}
    >
      <Form.Item fieldKey="keyword">
        <Form.Item.Input ref={firstInputRef} />
      </Form.Item>
      <button>submit</button>
    </Form>
  );
};
