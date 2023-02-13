import { createContext } from "react";
import { UseFormReturn } from "../types";

export const formContextDefaultValue: UseFormReturn = {
  values: {},
  errors: {},
  isSubmited: false,
  handleSubmit: console.debug,
  handleValue: console.debug,
};

export const FormContext = createContext<UseFormReturn>(
  formContextDefaultValue
);

const formItemContextDefaultValue = {
  fieldKey: "",
  isFocused: false,
  handleFocused: console.debug,
};

export const FormItemContext = createContext(formItemContextDefaultValue);
