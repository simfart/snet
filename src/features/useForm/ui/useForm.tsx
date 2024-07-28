import { useState, useCallback } from 'react';

type ValidationErrors = {
  [key: string]: string;
};

type FieldConfig = {
  value: string;
  required?: boolean;
  label?: string;
  type: string;
};

type InitialValues = {
  [key: string]: FieldConfig;
};

export const useForm = (initialValues: InitialValues) => {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      Object.entries(initialValues).map(([key, { value }]) => [key, value]),
    ),
  );
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    },
    [],
  );

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const { name } = event.target;

      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    },
    [],
  );

  const validateForm = useCallback(() => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    for (const key in initialValues) {
      const { required } = initialValues[key];
      const value = values[key];
      const input = document.querySelector(
        `input[name="${key}"]`,
      ) as HTMLInputElement;

      if (required && !value.trim()) {
        newErrors[key] = `${key} This field is required`;
        isValid = false;
      } else if (input && !input.validity.valid) {
        newErrors[key] = input.validationMessage;
        isValid = false;
      }
    }
    return { isValid, newErrors };
  }, [values, initialValues]);

  const handleSubmit = useCallback(
    (callback: (formData: Record<string, string>) => void) =>
      (event: React.FormEvent) => {
        event.preventDefault();

        const { isValid, newErrors } = validateForm();
        if (isValid) {
          const filteredValues = Object.fromEntries(
            Object.entries(values).filter(([key, value]) => {
              const { required } = initialValues[key];
              return required || value.trim() !== '';
            }),
          );
          callback(filteredValues);
        } else {
          setErrors(newErrors);
        }
      },
    [validateForm, values, initialValues],
  );

  const renderInputs = useCallback(() => {
    return Object.entries(initialValues).map(([key, config]) => (
      <div key={key}>
        <label htmlFor={key}>{config.label || key}</label>
        <input
          id={key}
          name={key}
          type={config.type}
          value={values[key]}
          onChange={handleChange}
          onFocus={handleFocus}
          required={config.required}
        />
        {/* {errors[key] && <span className="error">{errors[key]}</span>} */}
      </div>
    ));
  }, [initialValues, values, handleChange, handleFocus]);

  return {
    renderInputs,
    handleSubmit,
    errors,
    values,
  };
};
