import { ChangeEvent, cloneElement, FC, useContext } from "react";
import { InputProps } from "../../types";
import { FormContext, FormItemContext } from "../context";

const Input: FC<InputProps> = ({ as, fieldKey: propsFieldKey, ...props }) => {
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
      value={String(values[fieldKey])}
      onChange={handleChange}
      onBlur={handleFocused}
      autoComplete={props.autoComplete || props.type}
      {...props}
    />
  );
};

export { Input };
