import { useState, useCallback } from 'react';

// Тип для представления ошибок валидации
type ValidationErrors = {
  [key: string]: string;
};

// Тип для начальных значений с конфигурацией полей
type FieldConfig = {
  value: string;
  required?: boolean;
};

type InitialValues = {
  [key: string]: FieldConfig;
};

// Хук для управления состоянием и валидацией формы
const useForm = (initialValues: InitialValues) => {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(
      Object.entries(initialValues).map(([key, { value }]) => [key, value]),
    ),
  );
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Функция для обновления значений инпутов
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Функция для проверки валидности всей формы
  const validateForm = useCallback(() => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    for (const key in initialValues) {
      const { required } = initialValues[key];
      const value = values[key];
      const input = document.querySelector(
        `input[name="${key}"]`,
      ) as HTMLInputElement;

      // Проверка на пустое значение
      if (required && !value.trim()) {
        newErrors[key] = `${key}This field is required'`;
        isValid = false;
      } else if (input && !input.validity.valid) {
        newErrors[key] = input.validationMessage;
        isValid = false;
      }
    }
    setErrors(newErrors);
    return { isValid, newErrors };
  }, [values, initialValues]);

  // Функция для обработки отправки формы
  const handleSubmit =
    (callback: (formData: Record<string, string>) => void) =>
    (event: React.FormEvent) => {
      event.preventDefault();

      if (validateForm().isValid) {
        const filteredValues = Object.fromEntries(
          Object.entries(values).filter(([key, value]) => {
            const { required } = initialValues[key];
            return required || value.trim() !== '';
          }),
        );
        callback(filteredValues);
      } else {
        return validateForm().newErrors;
      }
    };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
