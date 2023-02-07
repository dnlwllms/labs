import { cloneElement, FC, Fragment, useContext } from "react";
import { ErrorMessageProps } from "../../types";
import { FormContext, FormItemContext } from "../context";

const ErrorMessage: FC<ErrorMessageProps> = ({ as, visible }) => {
  const form = useContext(FormContext);
  const { fieldKey, isFocused } = useContext(FormItemContext);

  const defaultVisible = !!(
    form.isSubmited ||
    form.values[fieldKey] ||
    isFocused
  );

  const message =
    (visible === undefined ? defaultVisible : visible) &&
    form.errors[fieldKey]?.[0];

  if (as) {
    return cloneElement(as, { children: message });
  }

  return <Fragment>{message}</Fragment>;
};

export { ErrorMessage };
