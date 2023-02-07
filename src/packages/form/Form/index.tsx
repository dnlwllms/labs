import { FormEvent } from "react";
import { FormComponent } from "../types";
import { FormContext, formContextDefaultValue } from "./context";
import { Item } from "./Item";
import { Input } from "./Item/Input";

const Form: FormComponent = ({
  children,
  form = formContextDefaultValue,
  onSubmit,
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    form.handleSubmit(onSubmit);
  };

  return (
    <FormContext.Provider value={form}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  );
};

Form.Input = Input;
Form.Item = Item;

export default Form;
