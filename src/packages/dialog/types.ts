import { FC, ReactElement } from "react";
import { MovePositionOption, Position } from "@dnlwllms/util";

export interface Context {
  id?: number;
  isOpen: boolean;
  triggerRect?: DOMRect;
  triggerPosition: Position;
  handleOpen: (e?: MouseEvent) => void;
  handleClose: (e?: MouseEvent) => void;
}

// Dialog 내장 컴포넌트
export type InternalDialog = {
  Trigger: FC<DialogTriggerProps>;
  Body: DialogBodyComponent;
};

// Dialog.Body 내장 컴포넌트
export type InternalDialogBody = {
  Popup: FC<DialogBodyPopupProps>;
};

// Dialog 컴포넌트와 props 인터페이스
export interface DialogProps {
  children: (context: Context) => ReactElement;
}
export interface DialogComponent extends FC<DialogProps>, InternalDialog {}

// Dialog.Trigger props 인터페이스
export interface DialogTriggerProps {
  children: ReactElement;
}

// Dialog.Body 컴포넌트와 props 인터페이스
export interface DialogBodyProps {
  children: ReactElement;
}
export interface DialogBodyComponent
  extends FC<DialogBodyProps>,
    InternalDialogBody {}

// Dialog.Body.Popup props 인터페이스
export interface DialogBodyPopupProps {
  children: ReactElement;
  triggerRect?: DOMRect;
  positionOption?: MovePositionOption;
  handleClose: () => void;
}
