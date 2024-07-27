import { FC } from 'react';
import { AuthForm } from './auth-form';
import { Link } from 'react-router-dom';

export const LoginPage: FC = () => {
  return (
    <div className="authContainer">
      <Link to="/">Home</Link>
      <AuthForm
        mode="login"
        title="Sign in"
        buttonText="Login"
        linkUrl="/register"
        linkText="Sign up"
      />
    </div>
  );
};
