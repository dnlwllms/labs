import {
  cloneElement,
  createContext,
  FC,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

type InternalDialog = {
  Trigger: FC<TriggerProps>;
  Body: FC<BodyProps>;
};

const dialogContextDefaultValue = {
  id: undefined as number | undefined,
  isOpen: false,
  triggerRect: {} as DOMRect | undefined,
  handleOpen: console.debug,
  handleClose: console.debug,
};

const DialogContext = createContext(dialogContextDefaultValue);

interface DialogProps extends PropsWithChildren {}

const DIALOG_DATA_ATTRIBUTE_NAME = "data-dnlwllms-dialog-id";

let initialId = 0;

const Dialog: FC<DialogProps> & InternalDialog = ({ children }) => {
  const [id] = useState<number>(initialId++);

  const [isOpen, setIsOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect>();

  const handleClose = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const dataId = Number(target.getAttribute(DIALOG_DATA_ATTRIBUTE_NAME));

      if (id !== dataId) {
        setIsOpen(false);
      }
    },
    [id]
  );

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, [handleClose, id]);

  const handleOpen = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target) {
      setTriggerRect(target.getBoundingClientRect());
    }

    setIsOpen(!isOpen);
  };

  return (
    <DialogContext.Provider
      value={{
        id,
        isOpen,
        triggerRect,
        handleOpen,
        handleClose,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

interface TriggerProps {
  children: ReactElement;
}

const Trigger: FC<TriggerProps> = ({ children }) => {
  const { id, handleOpen } = useContext(DialogContext);

  return cloneElement(children, {
    [DIALOG_DATA_ATTRIBUTE_NAME]: id,
    onClick: (e: MouseEvent) => {
      handleOpen(e);

      if (children.props.onClick) {
        children.props.onClick(e);
      }
    },
  });
};

interface BodyProps {
  children: (renderProps: {
    rect?: DOMRect;
    handleClose: () => void;
  }) => ReactElement;
}

const Body: FC<BodyProps> = ({ children }) => {
  const { isOpen, triggerRect, handleClose } = useContext(DialogContext);

  return isOpen
    ? createPortal(children({ rect: triggerRect, handleClose }), document.body)
    : null;
};

Dialog.Trigger = Trigger;
Dialog.Body = Body;

export default Dialog;
