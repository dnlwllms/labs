import { createContext, FC, PropsWithChildren } from "react";

const dialogContextDefaultValue = {};

const DialogContext = createContext(dialogContextDefaultValue);

interface DialogProps extends PropsWithChildren {}

const Dialog: FC<DialogProps> = ({ children }) => {
  return <DialogContext.Provider value={{}}>{children}</DialogContext.Provider>;
};

export default Dialog;
