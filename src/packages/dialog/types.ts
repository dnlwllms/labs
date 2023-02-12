import { FC, PropsWithChildren, ReactElement } from "react";
import { MovePositionOption } from "@dnlwllms/util";

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
export interface DialogProps extends PropsWithChildren {}
export interface DialogComponent extends FC<DialogProps>, InternalDialog {}

// Dialog.Trigger props 인터페이스
export interface DialogTriggerProps {
  children: ReactElement;
}

// Dialog.Body 컴포넌트와 props 인터페이스
export interface DialogBodyProps {
  children: (renderProps: {
    triggerRect?: DOMRect;
    handleClose: () => void;
  }) => ReactElement;
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
