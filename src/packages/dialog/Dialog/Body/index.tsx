import { useContext } from "react";
import { createPortal } from "react-dom";
import { DialogBodyComponent } from "../../types";
import { DialogContext } from "../context";
import Popup from "./Popup";

const Body: DialogBodyComponent = ({ children }) => {
  const { isOpen, triggerRect, handleClose } = useContext(DialogContext);

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
