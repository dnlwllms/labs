import { useEffect, useState } from "react";
import {
  FormError,
  FormValidation,
  UseFormParams,
  UseFormReturn,
} from "./types";

const useForm = <T extends Record<string, unknown>>({
  initialValues,
  validation,
}: UseFormParams<T>): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormError<T>>({});

  const [validationState] = useState<FormValidation<T> | undefined>(validation);

  // Submit 시도 했는지 여부 (mount시 error on/off 핸들링과 같은 경우 사용)
  const [isSubmited, setIsSubmited] = useState(false);

  // Validation Effect
  useEffect(() => {
    if (validationState) {
      const invalidItems: FormValidation<T> = validationState.filter((item) => {
        const instance: RegExp = new RegExp(item.regExp);

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

  const handleSubmit = (onSubmit: (values: T) => void): void => {
    setIsSubmited(true);

    if (Object.values(errors).length) {
      return;
    }

    if (onSubmit) {
      // 유효하지 않을 경우 submit 차단
      onSubmit(values);
    }
  };

  const handleValue = (key: keyof T, value: unknown): void => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  return {
    values,
    errors,
    isSubmited,
    handleSubmit,
    handleValue,
  };
};

export { useForm };
