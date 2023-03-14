import { createContext } from "react";
import { Context } from "../types";

// data-{id} 형태로 DOM에서 사용할 고유 식별자 키 이름
export const DIALOG_DATA_ATTRIBUTE_NAME = "data-dnlwllms-dialog-id";

const dialogContextDefaultValue: Context = {
  id: undefined,
  isOpen: false,
  triggerRect: undefined,
  triggerPosition: {
    top: 0,
    left: 0,
  },
  handleOpen: console.debug,
  handleClose: console.debug,
};

export const DialogContext = createContext<Context>(dialogContextDefaultValue);
