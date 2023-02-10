import { useCallback, useEffect, useState } from "react";
import { DialogComponent } from "../types";
import { DialogContext, DIALOG_DATA_ATTRIBUTE_NAME } from "./context";
import Body from "./Body";
import Trigger from "./Trigger";
import { Position } from "@dnlwllms/util";

let initialId = 1;

const Dialog: DialogComponent = ({ children }) => {
  const [id] = useState<number>(initialId++);

  const [isOpen, setIsOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect>();

  const [triggerPosition, setTriggerPosition] = useState<Position>({
    top: 0,
    left: 0,
  });

  const handleClose = useCallback(
    (e: MouseEvent) => {
      const isTarget = e?.composedPath().some((target) => {
        const element = target as HTMLElement;
        const isElement = !!element.getAttribute;

        if (isElement) {
          return (
            Number(
              (target as HTMLElement).getAttribute(DIALOG_DATA_ATTRIBUTE_NAME)
            ) === id
          );
        } else {
          return false;
        }
      });

      if (!isTarget) {
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

  const handleOpen = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;

    if (target) {
      setTriggerRect(target.getBoundingClientRect());
      setTriggerPosition({
        top: target.offsetTop,
        left: target.offsetLeft,
      });
    }

    setIsOpen(!isOpen);
  };

  return (
    <DialogContext.Provider
      value={{
        id,
        isOpen,
        triggerPosition,
        triggerRect,
        handleOpen,
        handleClose,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

Dialog.Trigger = Trigger;
Dialog.Body = Body;

export default Dialog;
