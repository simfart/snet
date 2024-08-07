import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { Loader } from 'shared/ui';
import { initialDataAuth } from 'shared/ui/initial-data';

import './AuthForm.scss';
import { useRegister } from '../../../features/auth/useRegister';
import { useLogin } from '../../../features/auth/useLogin';
import { loginInputs } from 'shared/inputs/formInputs';

interface AuthFormProps {
  mode: 'login' | 'register';
  title: string;
  buttonText: string;
  linkUrl: string;
  linkText: string;
  onSubmit?: () => void;
}

export const AuthForm = ({
  mode,
  title,
  buttonText,
  linkUrl,
  linkText,
}: AuthFormProps) => {
  const { mutate: login, isLoading: isloadLogin } = useLogin();
  const { mutate: register, isLoading } = useRegister();
  const [formData, setFormData] = useState(initialDataAuth.initial);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (mode === 'login') {
        login({ login: formData.email, password: formData.password });
      } else {
        //   if (formData.[].trim() === "" || values.description.trim() === "") {
        //     setError("Заполните все обязательные поля");
        // }

        register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          avatar: formData.avatar,
          about: formData.about,
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        alert(err.message);
      } else {
        console.error('Unexpected error', err);
      }
      return null;
    }
  };

  const handleChange = (
    name: keyof typeof initialDataAuth.initial,
    value: string,
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  type FieldName = keyof typeof initialDataAuth.initial;

  const renderInputs = useCallback(() => {
    return Object.entries(loginInputs).map(([key, config]) => (
      <div key={key}>
        <label htmlFor={key}>{key}</label>
        <input
          id={key}
          name={key}
          type={config.type}
          value={values[key]}
          onChange={handleChange}
          required={config.required}
        />
      </div>
    ));
  }, [values, handleChange]);

  if (isLoading || isloadLogin) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit} className="auth-container">
      <h1 className="auth-tile">{title}</h1>
      {Object.keys(initialDataAuth.login).map((field) => (
        <div key={field}>
          <input
            type={initialDataAuth.type[field as FieldName]}
            placeholder={initialDataAuth.placeholder[field as FieldName]}
            value={formData[field as FieldName]}
            onChange={(e) => handleChange(field as FieldName, e.target.value)}
            required={initialDataAuth.require[field as FieldName]}
          />
        </div>
      ))}
      {mode === 'register' && (
        <>
          {Object.keys(initialDataAuth.register).map((field) => (
            <div key={field}>
              <input
                type={initialDataAuth.type[field as FieldName]}
                placeholder={initialDataAuth.placeholder[field as FieldName]}
                value={formData[field as FieldName]}
                onChange={(e) =>
                  handleChange(field as FieldName, e.target.value)
                }
                required={initialDataAuth.require[field as FieldName]}
              />
            </div>
          ))}
        </>
      )}
      <button type="submit" className="ctaLink">
        {buttonText}
      </button>
      <Link to={linkUrl} className="auth-iconlink">
        {linkText}
      </Link>
    </form>
  );
};
