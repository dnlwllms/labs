# Form

> 클라이언트 영역에서 사용하는 React Form 컴포넌트

---

## 주요 기능

- key만 제공하면 데이터와 바인딩해서 submit callback 반환
- 정규표현식을 이용한 validation
- 내장 Input Component 제공

---

## Getting Started

1. Installation

```bash
    yarn add @dnlwllms/form
```

2. Form

```typescript
import Form from "@dnlwllms/form";

const App: React.FC = () => {
  const handleSubmit = (values: unknown) => {
    // fetch(...)
  };
  return (
    <Form onSubmit={handleSubmit}>
      <input />
    </Form>
  );
};
```

3. Hook

```typescript
import Form from "@dnlwllms/form";

const App: React.FC = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: unknown) => {
    // fetch(...)
  };

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <input
        type="email"
        onChange={({ target: { value } }) => {
          form.handleValue("email", value);
        }}
      />
      <input
        type="password"
        onChange={({ target: { value } }) => {
          form.handleValue("password", value);
        }}
      />
    </Form>
  );
};
```

4. Internal Input

```typescript
import Form from "@dnlwllms/form";

const App: React.FC = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: unknown) => {
    // fetch(...)
  };

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <Form.Input fieldKey="email" />
      <Form.Input type="password" fieldKey="password" />
      <Form.Input as={<PasswordInput />} fieldKey="password" />
    </Form>
  );
};

const PasswordInput = () => <input type="password" />;
```
