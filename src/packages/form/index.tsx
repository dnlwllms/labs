import {
  createContext,
  FC,
  ChangeEvent,
  FormEvent,
  PropsWithChildren,
  ReactElement,
  useState,
  useEffect,
  cloneElement,
  useContext,
} from "react";

type FormValidation<T> = Array<{
  key: keyof T;
  regExp: RegExp;
  message: string;
}>;

type FormError<T> = Partial<Record<keyof T, string[]>>;

type UseFormParams<T> = {
  initialValues: T;
  validation?: FormValidation<T>;
};

type UseFormReturn<T = Record<string, unknown>> = {
  values: T;
  errors: FormError<T>;
  handleValue: (key: keyof T, value: unknown) => void;
};

const formContextDefaultValue = {
  values: {},
  errors: {},
  handleValue: console.debug,
};

const FormContext = createContext<UseFormReturn>(formContextDefaultValue);

export const useForm = <T extends Record<string, unknown>>({
  initialValues,
  validation,
}: UseFormParams<T>): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormError<T>>({});

  const [validationState] = useState(validation);

  useEffect(() => {
    if (validationState) {
      const invalidItems = validationState.filter((item) => {
        const instance = new RegExp(item.regExp);

        return !instance.test(String(values[item.key]));
      });

      let newErrors: FormError<T> = {};
      invalidItems.forEach(({ key, message }) => {
        if (newErrors[key]) {
        } else {
          newErrors[key] = [message];
        }
      });

      setErrors(newErrors);
    }
  }, [validationState, values]);

  const handleValue = (key: keyof T, value: unknown) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  return {
    values,
    errors,
    handleValue,
  };
};

interface InternalForm {
  Item: FC<ItemProps>;
  Input: FC<InputProps>;
}

interface FormProps extends PropsWithChildren {
  form?: UseFormReturn;
  onSubmit?: (values: any) => void;
}

const Form: FC<FormProps> & InternalForm = ({
  children,
  form = formContextDefaultValue,
  onSubmit,
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(form.values);
    }
  };

  return (
    <FormContext.Provider value={form}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  );
};

export default Form;

interface ItemProps extends PropsWithChildren {
  label: string;
}

const Item: FC<ItemProps> = ({ children }) => {
  return <div>{children}</div>;
};

interface InputProps {
  as?: ReactElement;
  fieldKey: string;
}

const Input: FC<InputProps> = ({ as, fieldKey }) => {
  const { values, handleValue } = useContext(FormContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleValue(fieldKey, e.target.value);
  };

  if (as) {
    return cloneElement(as, {
      value: String(values.name),
      onChange: handleChange,
    });
  }

  return <input value={String(values[fieldKey])} onChange={handleChange} />;
};

Form.Item = Item;
Form.Input = Input;
