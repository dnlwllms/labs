import { Position } from "@dnlwllms/util";
import { createContext } from "react";

// data-{id} 형태로 DOM에서 사용할 고유 식별자 키 이름
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
