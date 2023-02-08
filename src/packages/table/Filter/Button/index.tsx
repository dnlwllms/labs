import Dialog from "@dnlwllms/dialog";
import { FC } from "react";
import { FilterButtonProps } from "../../types";

const Button: FC<FilterButtonProps> = ({ as }) => {
  return <Dialog.Trigger>{as || <button>filter</button>}</Dialog.Trigger>;
};

export default Button;
