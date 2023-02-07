import { FC, useContext } from "react";
import { createPortal } from "react-dom";
import { BodyProps } from "../types";
import { DialogContext } from "./context";

const Body: FC<BodyProps> = ({ children }) => {
  const { isOpen, triggerRect, handleClose } = useContext(DialogContext);

  return isOpen
    ? createPortal(children({ rect: triggerRect, handleClose }), document.body)
    : null;
};

export { Body };
