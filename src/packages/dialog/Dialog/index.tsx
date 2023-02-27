import { useCallback, useEffect, useState } from "react";
import { DialogComponent } from "../types";
import { DialogContext, DIALOG_DATA_ATTRIBUTE_NAME } from "./context";
import Body from "./Body";
import Trigger from "./Trigger";
import { Position } from "@dnlwllms/util";

const Dialog: DialogComponent = ({ children }) => {
  const [id] = useState<number>(Math.random());

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Trigger의 viewport 기준 좌표
  const [triggerRect, setTriggerRect] = useState<DOMRect>();

  // Trigger의 문서 기준 위치
  const [triggerPosition, setTriggerPosition] = useState<Position>({
    top: 0,
    left: 0,
  });

  /* 클릭한 Element가 bubble되는 동안 ID가 현재 dialog ID와 일치하면
  window click시 close Effect를 무효화 시키기 위한 로직이다.
  (stopPropagation 사용시 issue 있음) */
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

  // Window 클릭 시 닫히게 하는 effect
  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, [handleClose, id]);

  // Toggle handler (클릭 시 Trigger의 위치, 좌표 정보를 상태에 저장한다.)
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
