import { cloneElement, FC, useContext } from "react";
import { TriggerProps } from "../types";
import { DialogContext, DIALOG_DATA_ATTRIBUTE_NAME } from "./context";

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

export { Trigger };
