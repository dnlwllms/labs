import { ChangeEvent, cloneElement, forwardRef, useContext } from "react";
import { InputProps } from "../../types";
import { FormContext, FormItemContext } from "../context";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ as, fieldKey: propsFieldKey, ...props }, ref) => {
    const { values, handleValue } = useContext(FormContext);
    const { fieldKey: contextFieldKey, handleFocused } =
      useContext(FormItemContext);

    const fieldKey = propsFieldKey || contextFieldKey;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (fieldKey) {
        handleValue(fieldKey, e.target.value);
      }
    };

    if (as) {
      return cloneElement(as, {
        value: String(values.name),
        onChange: handleChange,
        onBlur: handleFocused,
        autoComplete: props.autoComplete || props.type,
        ...props,
      });
    }

    return (
      <input
        ref={ref}
        value={String(values[fieldKey])}
        onChange={handleChange}
        onBlur={handleFocused}
        autoComplete={props.autoComplete || props.type}
        {...props}
      />
    );
  }
);

export { Input };
