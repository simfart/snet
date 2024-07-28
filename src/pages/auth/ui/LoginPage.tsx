import { useLogin } from 'pages/auth/ui/hooks';
import { FC } from 'react';
import { Loader } from 'shared/ui';
import { useForm } from 'features/useForm/ui';
import { loginInputs } from 'features/useForm/model';
import { Link } from 'react-router-dom';

export const LoginPage: FC = () => {
  const { errors, handleSubmit, renderInputs } = useForm(loginInputs);
  const { mutate: login, isLoading } = useLogin();

  const onSubmit = (formData: Record<string, string>) => {
    try {
      login({ login: formData.email, password: formData.password });
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
        <h1 className="auth-title">Login</h1>
        {renderInputs()}
        <div>
          {Object.entries(errors).map(([field, message]) => (
            <div key={field} className="error-message">
              {message}
            </div>
          ))}
        </div>
        <button type="submit">Submit</button>
        <Link to="/register" className="auth-iconlink">
          Register
        </Link>
      </form>
    </div>
  );
};
