import { useCallback, useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { DialogBodyComponent } from "../../types";
import { DialogContext } from "../context";
import Popup from "./Popup";

const Body: DialogBodyComponent = ({ children }) => {
  const { isOpen, triggerRect, handleClose } = useContext(DialogContext);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          handleClose();
          return;
      }
    },
    [handleClose]
  );

  // Keydown Side Effect
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  return isOpen
    ? createPortal(
        children({
          triggerRect,
          handleClose,
        }),
        document.body
      )
    : null;
};

Body.Popup = Popup;

export default Body;
