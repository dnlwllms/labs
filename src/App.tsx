import { ChangeEvent } from "react";
import Dialog from "./packages/dialog";
import Form, { regExpExample, useForm } from "./packages/form";
import { NumberUtility, StringUtility, DateUtility } from "./packages/util";
import Table, { Filter } from "@dnlwllms/table";

const { getRandomNumber, getTelNumber } = NumberUtility;
const { getRandomWord, getStringParagragh } = StringUtility;
const { getRandomDate } = DateUtility;

type TestForm = {
  id: number;
  name: string;
  email: string;
  tel: string;
  options: string[];
};

function App() {
  const form = useForm<TestForm>({
    initialValues: {
      id: 0,
      name: "",
      email: "",
      tel: "",
      options: ["a", "b", "c"],
    },
    validation: [
      {
        key: "id",
        regExp: regExpExample.userId,
        message: "잘못된 형식 입니다.",
      },
      {
        key: "name",
        regExp: regExpExample.koreanName,
        message: "잘못된 이름 형식 입니다.",
      },
      {
        key: "email",
        regExp: regExpExample.email,
        message: "잘못된 이메일 형식 입니다.",
      },
      {
        key: "tel",
        regExp: regExpExample.tel,
        message: "잘못된 전화번호 형식 입니다.",
      },
    ],
  });

  const handleTelChange = (e: ChangeEvent<HTMLInputElement>) => {
    form.handleValue("tel", getTelNumber(e.target.value));
  };

  const columns = [
    {
      key: "personalInfo",
      title: "개인정보",
      children: [
        {
          key: "id",
          title: "아이디",
        },
        {
          key: "name",
          title: "이름",
        },
        {
          key: "age",
          title: "연령",
        },
        {
          key: "gender",
          title: "성별",
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
        },
        {
          key: "memo",
          title: "메모",
        },
        {
          key: "createdAt",
          title: "생성일",
        },
      ],
    },
  ];

  return (
    <div>
      <Form form={form} onSubmit={console.log}>
        <Form.Item fieldKey="id">
          <Form.Item.Input />
          <Form.Item.ErrorMessage as={<div />} />
        </Form.Item>
        <Form.Item fieldKey="name">
          <Form.Item.Input type="name" />
          <Form.Item.ErrorMessage as={<div />} />
        </Form.Item>
        <Form.Item fieldKey="email">
          <Form.Item.Input type="email" />
          <Form.Item.ErrorMessage as={<div />} />
        </Form.Item>
        <Form.Item fieldKey="tel">
          <Form.Item.Input type="tel" onChange={handleTelChange} />
          <Form.Item.ErrorMessage as={<div />} />
        </Form.Item>
        <button>submit</button>
      </Form>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12].map((key) => {
        return (
          <Dialog key={key}>
            <Dialog.Trigger>
              <button>open</button>
            </Dialog.Trigger>
            <Dialog.Body>
              {({ triggerRect, handleClose }) => {
                return (
                  <Dialog.Body.Popup
                    triggerRect={triggerRect}
                    handleClose={handleClose}
                    positionOption={{
                      topMargin: triggerRect?.height || 0,
                    }}
                  >
                    <div
                      style={{
                        whiteSpace: "nowrap",
                        background: "white",
                        padding: 20,
                        borderRadius: 10,
                        border: "1px solid gray",
                      }}
                    >
                      하이하이하이하이하이하이하이
                    </div>
                  </Dialog.Body.Popup>
                );
              }}
            </Dialog.Body>
          </Dialog>
        );
      })}
      <Table
        columns={columns}
        data={Array.from({ length: 100 }).map((_, index) => {
          return {
            id: index,
            name: getRandomWord(getStringParagragh("names")),
            age: getRandomNumber(15, 50),
            gender: getRandomNumber() % 2 === 0 ? "male" : "female",
            nickname: getRandomWord(getStringParagragh("names")),
            memo: getRandomWord(),
            createdAt: getRandomDate().toISOString(),
          };
        })}
      >
        <Table.Head>
          {({ entryColumns }) => {
            return entryColumns.map((row, rowIndex) => {
              return (
                <tr key={row[rowIndex].key}>
                  {row.map((column) => {
                    return (
                      <th key={column.key} colSpan={column.colSpan}>
                        {column.title}
                        <Filter>
                          <Filter.Button />
                          <Filter.Popup
                            positionOption={{
                              rightMargin: 12,
                            }}
                          >
                            <div
                              style={{
                                whiteSpace: "nowrap",
                                background: "white",
                                padding: 20,
                                borderRadius: 10,
                                border: "1px solid gray",
                              }}
                            >
                              하이하이하이하이하이하이하이
                            </div>
                          </Filter.Popup>
                        </Filter>
                      </th>
                    );
                  })}
                </tr>
              );
            });
          }}
        </Table.Head>
        <Table.Body />
      </Table>
    </div>
  );
}

export default App;
