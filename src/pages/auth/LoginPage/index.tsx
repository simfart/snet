import { FC, useCallback } from 'react';

import { Loader } from 'shared/ui';
import { Link } from 'react-router-dom';
import { useLogin } from 'features/auth/hooks/useLogin';
import { loginInputs } from 'shared/inputs/formInputs';
import { useForm } from 'shared/hooks/useForm';

export const LoginPage: FC = () => {
  const { handleChange, handleFocus, handleSubmit, values, getErrorClass } =
    useForm(loginInputs);

  const { mutate, isLoading } = useLogin();

  const onSubmit = (formData: Record<string, string>) => {
    try {
      mutate({ login: formData.email, password: formData.password });
    } catch (err) {
      console.log(err);
    }
  };

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
          onFocus={handleFocus}
          required={config.required}
          className={getErrorClass(key)}
          placeholder={key}
        />
      </div>
    ));
  }, [values, handleChange, handleFocus, getErrorClass]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="authContainer">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1 className="auth-title">Login</h1>
        {renderInputs()}
        <button type="submit">Sign in</button>
        <Link to="/register" className="auth-iconlink">
          Register
        </Link>
      </form>
    </div>
  );
};
