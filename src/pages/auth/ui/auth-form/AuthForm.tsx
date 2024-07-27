import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegister, useLogin } from '../hooks';
import { Loader } from 'shared/ui';

import './AuthForm.scss';

interface AuthFormProps {
  mode: 'login' | 'register';
  title: string;
  buttonText: string;
  linkUrl: string;
  linkText: string;
}

const initialFormState = {
  email: '',
  password: '',
  name: '',
};

export const AuthForm = ({
  mode,
  title,
  buttonText,
  linkUrl,
  linkText,
}: AuthFormProps) => {
  const [formState, setFormState] = useState(initialFormState);
  const { mutate: login, isLoading: isloadLogin } = useLogin();
  const { mutate: register, isLoading } = useRegister();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (mode === 'login') {
        login({ login: formState.email, password: formState.password });
      } else {
        register({
          name: formState.name,
          email: formState.email,
          password: formState.password,
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

  if (isLoading || isloadLogin) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit} className="auth-container">
      <h1 className="auth-tile">{title}</h1>
      <input
        type="email"
        placeholder="Email"
        value={formState.email}
        onChange={(event) =>
          setFormState((prevState) => ({
            ...prevState,
            email: event.target.value,
          }))
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={formState.password}
        onChange={(event) =>
          setFormState((prevState) => ({
            ...prevState,
            password: event.target.value,
          }))
        }
      />
      {mode === 'register' && (
        <>
          <input
            type="text"
            placeholder="Name"
            value={formState.name}
            onChange={(event) =>
              setFormState((prevState) => ({
                ...prevState,
                name: event.target.value,
              }))
            }
          />
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
