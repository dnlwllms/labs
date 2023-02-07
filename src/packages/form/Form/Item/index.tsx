import { cloneElement, useState } from "react";
import { FormItemComponent } from "../../types";
import { FormItemContext } from "../context";
import { ErrorMessage } from "./ErrorMessage";
import { Input } from "./Input";

const Item: FormItemComponent = ({ children, fieldKey, as }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <FormItemContext.Provider
      value={{ fieldKey, isFocused: isFocused, handleFocused: handleFocus }}
    >
      {as ? cloneElement(as, { children }) : children}
    </FormItemContext.Provider>
  );
};

Item.Input = Input;
Item.ErrorMessage = ErrorMessage;

export { Item };
