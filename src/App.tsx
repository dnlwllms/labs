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

  console.log(form.values, form.errors);

  return (
    <div className="App">
      <Form form={form} onSubmit={console.log}>
        <Form.Input fieldKey="id" />
        {!!(form.isSubmited || form.values.id) && form.errors.id?.[0]}
        <Form.Input autoComplete="name" fieldKey="name" />
        {!!(form.isSubmited || form.values.name) && form.errors.name?.[0]}
        <Form.Input autoComplete="email" type="email" fieldKey="email" />
        {!!(form.isSubmited || form.values.email) && form.errors.email?.[0]}
        <Form.Input
          autoComplete="tel"
          type="tel"
          fieldKey="tel"
          onChange={handleTelChange}
        />
        {!!(form.isSubmited || form.values.tel) && form.errors.tel?.[0]}
        <button>submit</button>
      </Form>
    </div>
  );
}

export default App;
