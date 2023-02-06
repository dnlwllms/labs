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
  isOpen: false,
  triggerRect: new DOMRect(),
  handleOpen: console.debug,
  handleClose: console.debug,
};

const DialogContext = createContext(dialogContextDefaultValue);

interface DialogProps extends PropsWithChildren {
  open?: boolean;
  onClose?: () => void;
}

const Dialog: FC<DialogProps> & InternalDialog = ({
  children,
  open,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState(new DOMRect());

  const handleClose = useCallback(
    (e: MouseEvent) => {
      setIsOpen(false);

      if (onClose) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, [handleClose]);

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
        isOpen: open === undefined ? isOpen : open,
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
  const { handleOpen } = useContext(DialogContext);

  return cloneElement(children, {
    onClick: (e: MouseEvent) => {
      e.stopPropagation();
      handleOpen(e);

      if (children.props.onClick) {
        children.props.onClick();
      }
    },
  });
};

interface BodyProps {
  children: (rect: DOMRect) => ReactElement;
}

const Body: FC<BodyProps> = ({ children }) => {
  const { isOpen, triggerRect } = useContext(DialogContext);

  return isOpen ? createPortal(children(triggerRect), document.body) : null;
};

Dialog.Trigger = Trigger;
Dialog.Body = Body;

export default Dialog;
