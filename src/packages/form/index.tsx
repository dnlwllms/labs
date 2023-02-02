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
  HTMLAttributes,
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

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  as?: ReactElement;
  fieldKey: string;
}

const Input: FC<InputProps> = ({ as, fieldKey, ...props }) => {
  const { values, handleValue } = useContext(FormContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleValue(fieldKey, e.target.value);
  };

  if (as) {
    return cloneElement(as, {
      value: String(values.name),
      onChange: handleChange,
      ...props,
    });
  }

  return (
    <input
      value={String(values[fieldKey])}
      onChange={handleChange}
      {...props}
    />
  );
};

Form.Input = Input;

export const regExpExample = {
  /**
   * 숫자
   */
  number: /^[0-9]+$/,
  /**
   * 이메일 형식
   */
  email: /^[a-z0-9.\-_]+@([a-z0-9-]+\.)+[a-z]{2,6}$/,
  /**
   * 한글
   */
  korean: /^[가-힣]+$/,
  /**
   * 공백을 포함한 한글
   */
  koreanAllowSpace: /^[가-힣\s]+$/,
  /**
   * 영문
   */
  english: /^[a-zA-Z]+$/,
  /**
   * 공백을 포함한 영문
   */
  englishAllowSpace: /^[a-zA-Z\s]+$/,
  /**
   * 한글 + 영문
   */
  koreanAndEnglish: /^[가-힣a-zA-Z]+$/,
  /**
   * 영문 + 숫자
   */
  englishAndNumber: /^[a-zA-Z0-9]+$/,
  /**
   * 주민등록번호
   */
  koreanIdNumber:
    /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4][0-9]{6}$/,
  /**
   * 도메인 (프로토콜 선택)
   */
  urlOptionalProtocol:
    /^(((http(s?)):\/\/)?)([0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}(:[0-9]+)?(\/\S*)?$/,
  /**
   * 도메인 (프로토콜 필수)
   */
  urlHasProtocol:
    /^((http(s?)):\/\9a-zA-Z-]+\.)+[a-zA-Z]{2,6}(:[0-9]+)?(\/\S*)?$/,
  /**
   * 한글 이름
   */
  koreanName: /^[가-힣]{2,4}$/,
  /**
   * 영문 User Id (4~20자리, 첫 글자 숫자 불가능)
   */
  userId: /^[A-Za-z]{1}[A-Za-z0-9]{3,19}$/,
  /**
   * 글자수만 제한한 한글 닉네임 (2~20자리)
   */
  koreanNickname: /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/,
  /**
   *  비밀번호 (최소 8자리, 숫자, 문자, 특수문자 최소 1개 이상)
   */
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
  /**
   * 비밀번호 (최소 8자리, 대문자, 소문자, 숫자 최소 1개 이상)
   */
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  /**
   * 비밀번호 (최소 8자리, 대문자, 소문자, 숫자, 특수문자 1개 이상)
   */
  strictPassword:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/,
  /**
   * 전화번호
   */
  tel: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/,
  /**
   * 한국 전화번호 형식
   */
  koreanTel: /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
};
