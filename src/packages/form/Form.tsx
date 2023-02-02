import React, { PropsWithChildren } from "react";

interface FormProps extends PropsWithChildren {}

const Form: React.FC<FormProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Form;

export const useForm = () => {};
