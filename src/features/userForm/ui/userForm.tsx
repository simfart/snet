import { ChangeEvent, FormEvent, useState } from 'react';

type IValidatorFN = (s: string) => string | void;

export interface IField {
  value?: string;
  type?: string;
  label?: string;
  error?: string;
  isValid?: boolean;
  required?: boolean;
  touched?: boolean;
  setState?: (event: ChangeEvent<HTMLInputElement>) => void;
  validators?: IValidatorFN[];
}

export type ICustomField<T = Record<string, unknown>> = IField & T;

export type ICustomObject<T = Record<string, unknown>> = {
  [key: string]: ICustomField & T;
};

export type IValues = {
  [key: string]: string | number;
};

export type IForm = {
  fields: ICustomObject;
  isValid: boolean;
  handleSubmit: (onSubmit: (values: IValues) => void) => (e: FormEvent) => void;
};

type IOptions = {
  [key: string]: unknown;
};
export const useForm = (initialFields: ICustomObject): IForm => {
  const form = Object.entries(initialFields).reduce(
    (fields, [name, value]: [string, any]) => {
      const isString = typeof value === 'string';

      const field = {
        [name]: {
          type: 'text',
          value: (isString && value) || (!isString && value.value) || '',
          error: (!isString && value.error) || null,
          validators: (!isString && value.validators) || [],
          isValid: (!isString && value.isValid) || true,
          required: (!isString && value.required) || false,
          touched: false,
          setState: (event: ChangeEvent<HTMLInputElement>) =>
            handleInput(event, name),
          ...(!isString && value),
        },
      };

      return { ...fields, ...field };
    },
    {},
  );

  const [fields, setState] = useState<ICustomObject>(form);
  const [isValid, setFormValid] = useState<boolean>(true);

  const getFormValidationState = (fields: ICustomObject): boolean =>
    Object.entries(fields).reduce(
      (isValid: boolean, [_, field]: [string, ICustomField]) =>
        isValid && !!field.isValid,
      true,
    );

  const fieldValidation = (field: ICustomField, options: IOptions = {}) => {
    const { value, required, validators } = field;

    let isValid = true;
    let error = '';

    if (required) {
      isValid = !!value;
      error = isValid ? '' : 'field is required';
    }

    if (validators && Array.isArray(validators)) {
      const results = validators
        .map((validateFn) => {
          if (typeof validateFn === 'string') return validateFn;

          const validationResult = validateFn(value || '');

          return typeof validationResult === 'string' ? validationResult : '';
        })
        .filter((message) => message !== '');

      if (results.length) {
        isValid = false;
        error = results[0];
      }
    }

    return { ...field, isValid, error, ...options };
  };

  const handleInput = (
    element: ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    const input = fields[name];
    const value = element.target.value;

    const field = {
      ...input,
      value,
      touched: true,
      isValid: true,
    };

    const validatedField = fieldValidation(field);

    setState((prevState: ICustomObject) => {
      const updatedFields = { ...prevState, [name]: validatedField };

      setFormValid(getFormValidationState(updatedFields));
      return updatedFields;
    });
  };

  const handleSubmit =
    (onSubmit: (values: IValues) => void) => (e: FormEvent) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      const fieldsArray = Object.entries(fields);
      const values = fieldsArray.reduce(
        (prev: IValues, [name, field]: [string, ICustomField]) => {
          prev[name] = field.value || '';
          return prev;
        },
        {} as IValues,
      );
      const validatedInputs = fieldsArray.reduce(
        (prev: ICustomObject, [name, field]: [string, ICustomField]) => {
          prev[name] = fieldValidation(field, { touched: true });
          return prev;
        },
        {},
      );

      setFormValid(getFormValidationState(validatedInputs));
      setState(validatedInputs);

      onSubmit(values);
    };

  return {
    fields,
    isValid,
    handleSubmit,
  };
};
