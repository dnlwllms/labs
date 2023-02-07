import { createContext } from "react";

export const DIALOG_DATA_ATTRIBUTE_NAME = "data-dnlwllms-dialog-id";

const dialogContextDefaultValue = {
  id: undefined as number | undefined,
  isOpen: false,
  triggerRect: {} as DOMRect | undefined,
  handleOpen: console.debug,
  handleClose: console.debug,
};

export const DialogContext = createContext(dialogContextDefaultValue);
