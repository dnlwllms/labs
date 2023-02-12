# Dialog

> Toast, Modal, Select 등 Popup 관련 인터렉션 컴포넌트

---

## Getting Started

1. Installation

```bash
    yarn add @dnlwllms/dialog
```

2. Import Package

```typescript
import Dialog from "@dnlwllms/dialog";

const Modal: React.FC = () => {
  return (
    <Dialog>
      <Dialog.Trigger>
        <button>Detail</button>
      </Dialog.Trigger>
      <Dialog.Body>
        <DetailInfo />
      </Dialog.Body>
    </Dialog>
  );
};
```

3.  Operating Principle

    a. Trigger는 Children인 ReactElement에 Click Event를 부여한다.

        💡 Dialog는 내부적으로 Trigger와 Body사이에 필요한 상태를 context로 가지고 있다. Click시 내부 State를 변경하고 Children onClick을 실행 하도록 구성되어 있다.

    b. Click 시 Dialog 내부에 open state가 바뀌면서 Body의 Children을 portal을 이용하여 render 한다.
