import { FC } from 'react';
import { registerInputs } from 'shared/inputs/formInputs';
import { useRegister } from 'features/auth/useRegister';
import { useForm } from 'shared/hooks/useForm';
import { Loader } from 'shared/ui';
import { AuthForm } from 'widgets/authForm';

export const RegisterPage: FC = () => {
  const { mutate, isLoading } = useRegister();
  const { handleChange, handleFocus, handleSubmit, values, getErrorClass } =
    useForm(registerInputs);

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

  return (
    <>
      {isLoading && <Loader />}
      <AuthForm
        buttonText="Register"
        initialData={registerInputs}
        linkText="Log In"
        title="Register"
        linkUrl="/login"
        handleChange={handleChange}
        getErrorClass={getErrorClass}
        handleFocus={handleFocus}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        values={values}
        mode="register"
        spanText="Already have an account? "
      />
    </>
  );
};
