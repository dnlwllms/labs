import Form, { useForm } from "./packages/form";

type TestForm = {
  id: number;
  name: string;
  email: string;
  options: string[];
};

function App() {
  const form = useForm<TestForm>({
    initialValues: {
      id: 0,
      name: "",
      email: "",
      options: ["a", "b", "c"],
    },
    validation: [
      {
        key: "id",
        regExp: /^[가-힣]{2,4}$/,
        message: "잘못된 형식 입니다.",
      },
      {
        key: "email",
        regExp: /^[a-z0-9.\-_]+@([a-z0-9-]+\.)+[a-z]{2,6}$/,
        message: "잘못된 이메일 형식 입니다.",
      },
    ],
  });

  return (
    <div className="App">
      <Form form={form} onSubmit={console.log}>
        <Form.Input fieldKey="id" />
        <Form.Input fieldKey="name" />
        <Form.Input fieldKey="email" />
        <button>submit</button>
      </Form>
    </div>
  );
}

export default App;
