import { useContext } from "react";
import { createPortal } from "react-dom";
import { DialogBodyComponent } from "../../types";
import { DialogContext } from "../context";
import Popup from "./Popup";

const Body: DialogBodyComponent = ({ children }) => {
  const {
    isOpen,
    triggerRect,
    handleClose,
    triggerPosition: position,
  } = useContext(DialogContext);

  return isOpen
    ? createPortal(
        children({
          triggerRect: triggerRect,
          triggerPosition: position,
          handleClose,
        }),
        document.body
      )
    : null;
};

Body.Popup = Popup;

export default Body;
