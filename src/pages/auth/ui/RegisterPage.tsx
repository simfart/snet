import { FC, useCallback } from 'react';
import { Loader } from 'shared/ui';
import { Link } from 'react-router-dom';

import { useForm } from 'shared/hooks/useForm';
import { registerInputs } from 'shared/inputs/formInputs';
import { useRegister } from 'features/auth/useRegister';

export const RegisterPage: FC = () => {
  const { handleChange, handleFocus, handleSubmit, values, getErrorClass } =
    useForm(registerInputs);

  const { mutate, isLoading } = useRegister();

  const onSubmit = (formData: Record<string, string>) => {
    try {
      mutate({
        name: formData.userName,
        email: formData.email,
        password: formData.password,
        avatar: formData.avatar,
        about: formData.about,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const renderInputs = useCallback(() => {
    return Object.entries(registerInputs).map(([key, config]) => (
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="auth-container"
        noValidate
      >
        <h1 className="auth-title">Register</h1>
        {renderInputs()}
        <button type="submit">Submit</button>
        <Link to="/login" className="auth-iconlink">
          Sign in
        </Link>
      </form>
    </div>
  );
};
