import Dialog from "@dnlwllms/dialog";
import { FC } from "react";
import { FilterPopupProps } from "../../types";

const Popup: FC<FilterPopupProps> = ({ children, positionOption }) => {
  return (
    <Dialog.Body>
      {({ triggerRect, handleClose }) => {
        return (
          <Dialog.Body.Popup
            triggerRect={triggerRect}
            handleClose={handleClose}
            positionOption={{
              topMargin: triggerRect?.height,
              ...positionOption,
            }}
          >
            {children}
          </Dialog.Body.Popup>
        );
      }}
    </Dialog.Body>
  );
};

export default Popup;
