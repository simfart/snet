import { FC } from 'react';
import { Loader } from 'shared/ui';
import { useLogin } from 'features/auth/useLogin';
import { loginInputs } from 'shared/inputs/formInputs';
import { useForm } from 'shared/hooks/useForm';
import { AuthForm } from 'widgets/authForm';

export const LoginPage: FC = () => {
  const { mutate, isLoading } = useLogin();
  const { handleChange, handleFocus, handleSubmit, values, getErrorClass } =
    useForm(loginInputs);

  const onSubmit = (formData: Record<string, string>) => {
    try {
      mutate({ login: formData.email, password: formData.password });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <AuthForm
        buttonText="Login"
        initialData={loginInputs}
        linkText="Register"
        title="Login"
        linkUrl="/register"
        handleChange={handleChange}
        getErrorClass={getErrorClass}
        handleFocus={handleFocus}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        values={values}
        mode="login"
        spanText="Don’t have an account yet? "
      />
    </>
  );
};
