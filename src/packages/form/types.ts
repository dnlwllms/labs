import {
  FC,
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  PropsWithChildren,
  ReactElement,
  RefAttributes,
} from "react";

export type UseFormParams<T> = {
  initialValues: T;
  validation?: FormValidation<T>;
  options?: UseFormOptions;
};

export type UseFormReturn<T = Record<string, unknown>> = {
  values: T;
  errors: FormError<T>;
  isSubmited: boolean;
  handleSubmit: (onSubmit: (values: T) => void) => void;
  handleValue: (key: keyof T, value: unknown) => void;
};

export type FormValidation<T> = Array<{
  key: keyof T;
  regExp: RegExp;
  message: string;
}>;

export type UseFormOptions = {};

export type FormError<T> = Partial<Record<keyof T, string[]>>;

export type InternalForm = {
  Input: ForwardRefExoticComponent<
    InputProps & RefAttributes<HTMLInputElement>
  >;
  Item: FormItemComponent;
};

export type InternalFormItem = {
  Input: ForwardRefExoticComponent<
    InputProps & RefAttributes<HTMLInputElement>
  >;
  ErrorMessage: FC<ErrorMessageProps>;
};

export interface FormComponent extends FC<FormProps>, InternalForm {}

export interface FormItemComponent extends FC<ItemProps>, InternalFormItem {}

export interface FormProps extends PropsWithChildren {
  form?: UseFormReturn;
  onSubmit?: (values: any) => void;
}

export interface ItemProps extends PropsWithChildren {
  fieldKey: string;
  as?: ReactElement;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  as?: ReactElement;
  fieldKey?: string;
}

export interface ErrorMessageProps {
  as?: ReactElement;
  visible?: boolean;
}
