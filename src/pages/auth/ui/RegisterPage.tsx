import { useRegister } from 'pages/auth/ui/hooks';
import { FC } from 'react';
import { Loader } from 'shared/ui';
import { useForm } from 'features/useForm/ui';
import { registerInputs } from 'features/useForm/model';
import { Link } from 'react-router-dom';

export const RegisterPage: FC = () => {
  const { errors, handleSubmit, renderInputs } = useForm(registerInputs);
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
      if (err instanceof Error) {
        console.error(err.message);
        alert(err.message);
      } else {
        console.error('Unexpected error', err);
      }
      return null;
    }
  };

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
        <div>
          {Object.entries(errors).map(([field, message]) => (
            <div key={field} className="error-message">
              {message}
            </div>
          ))}
        </div>
        <button type="submit">Submit</button>
        <Link to="/login" className="auth-iconlink">
          Sign in
        </Link>
      </form>
    </div>
  );
};
