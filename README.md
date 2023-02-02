# React CRA 기반 개발 실험실

CRA tsconfig package 배포 환경에 맞게 수정

## Packages

## Util

> Unit 테스팅을 위한 Utility Method(mock 데이터 생성 및 단위 테스트 진행용) Package

- StringUtility
- NumberUtility
- ObjectUtility
- DateUtility

## Form

> 클라이언트 영역에서 사용하는 React Form 컴포넌트

### 주요 기능

- key만 제공하면 데이터와 바인딩해서 submit callback 반환
- 정규표현식을 이용한 validation

### Getting Started

1. Installation

```bash
    yarn add dnlwllms-form
```

2. Form

```typescript
import Form from "dnlwllms-form";

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
import Form from "dnlwllms-form";

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
    <Form onSubmit={handleSubmit}>
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
import Form from "dnlwllms-form";

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
    <Form onSubmit={handleSubmit}>
      <Form.Input fieldKey="email" />
      <Form.Input as={<PasswordInput />} fieldKey="password" />
    </Form>
  );
};

const PasswordInput = () => <input type="password" />;
```
