import { ChangeEvent } from "react";
import Form, { useForm, regExpExample } from "./packages/form";
import { NumberUtility } from "./packages/util";

const { getTelNumber } = NumberUtility;

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

  return (
    <div className="App">
      <Form form={form} onSubmit={console.log}>
        <Form.Item fieldKey="id">
          <Form.Item.Input />
          <Form.Item.ErrorMessage />
        </Form.Item>
        <Form.Item fieldKey="name">
          <Form.Item.Input type="name" />
          <Form.Item.ErrorMessage />
        </Form.Item>
        <Form.Item fieldKey="email">
          <Form.Item.Input type="email" />
          <Form.Item.ErrorMessage />
        </Form.Item>
        <Form.Item fieldKey="tel">
          <Form.Item.Input type="tel" onChange={handleTelChange} />
          <Form.Item.ErrorMessage />
        </Form.Item>
        <button>submit</button>
      </Form>
    </div>
  );
}

export default App;
