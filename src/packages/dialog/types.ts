import { FC, PropsWithChildren, ReactElement } from "react";
import { MovePositionOption } from "@dnlwllms/util";

export type InternalDialog = {
  Trigger: FC<DialogTriggerProps>;
  Body: DialogBodyComponent;
};

export type InternalDialogBody = {
  Popup: FC<PopupProps>;
};

export interface DialogComponent extends FC<DialogProps>, InternalDialog {}

export interface DialogProps extends PropsWithChildren {}

export interface DialogTriggerProps {
  children: ReactElement;
}

export interface DialogBodyProps {
  children: (renderProps: {
    triggerRect?: DOMRect;
    handleClose: () => void;
  }) => ReactElement;
}

export interface DialogBodyComponent
  extends FC<DialogBodyProps>,
    InternalDialogBody {}

export interface PopupProps {
  children: ReactElement;
  triggerRect?: DOMRect;
  positionOption?: MovePositionOption;
  handleClose: () => void;
}
