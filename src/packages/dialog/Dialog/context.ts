import { Position } from "@dnlwllms/util";
import { createContext } from "react";

export const DIALOG_DATA_ATTRIBUTE_NAME = "data-dnlwllms-dialog-id";

const dialogContextDefaultValue = {
  id: undefined as number | undefined,
  isOpen: false,
  triggerRect: {} as DOMRect | undefined,
  triggerPosition: {
    top: 0,
    left: 0,
  } as Position,
  handleOpen: console.debug,
  handleClose: console.debug,
};

export const DialogContext = createContext(dialogContextDefaultValue);
