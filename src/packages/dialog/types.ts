import { FC, PropsWithChildren, ReactElement } from "react";

export type InternalDialog = {
  Trigger: FC<TriggerProps>;
  Body: FC<BodyProps>;
};

export interface DialogComponent extends FC<DialogProps>, InternalDialog {}

export interface DialogProps extends PropsWithChildren {}

export interface TriggerProps {
  children: ReactElement;
}

export interface BodyProps {
  children: (renderProps: {
    rect?: DOMRect;
    handleClose: () => void;
  }) => ReactElement;
}
