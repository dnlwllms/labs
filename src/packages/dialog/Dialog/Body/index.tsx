import { useCallback, useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { DialogBodyComponent } from "../../types";
import { DialogContext } from "../context";
import Popup from "./Popup";

const Body: DialogBodyComponent = ({ children }) => {
  const context = useContext(DialogContext);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          context.handleClose();
          return;
      }
    },
    [context]
  );

  // Keydown Side Effect
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  return context.isOpen ? createPortal(children, document.body) : null;
};

Body.Popup = Popup;

export default Body;
