import Dialog from "@dnlwllms/dialog";
import { FC } from "react";
import { FilterPopupProps } from "../../types";

const Popup: FC<FilterPopupProps> = ({ children }) => {
  return <Dialog.Body>{() => children}</Dialog.Body>;
};

export default Popup;
