import { FC, PropsWithChildren, ReactElement } from "react";
import { MovePositionOption, Position } from "@dnlwllms/util";

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
    triggerPosition: Position;
    handleClose: () => void;
  }) => ReactElement;
}

export interface DialogBodyComponent
  extends FC<DialogBodyProps>,
    InternalDialogBody {}

export interface PopupProps {
  children: ReactElement;
  triggerRect?: DOMRect;
  /**
   * 문서에서 실제 위치(rect는 viewport기준, position은 문서 크기 기준)
   */
  triggerPosition: Position;
  positionOption?: MovePositionOption;
  handleClose: () => void;
}
