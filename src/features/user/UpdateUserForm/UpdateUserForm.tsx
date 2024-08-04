import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUpdateUser } from '../model/useUpdateUser';
import { Loader } from '../../../shared/ui/loader/Loader';

import { useUser } from 'features/auth/hooks/useUser';

interface IUserForm {
  name: string;
  email: string;
}

export const UpdateUserForm: FC = () => {
  const { user, isLoading: isLoadingUser } = useUser();

  const [formState, setFormState] = useState({
    email: user?.email,
    name: user?.name,
  });
  const { mutate, isLoading } = useUpdateUser();

  useEffect(() => {
    if (user) {
      setFormState({
        email: user?.email,
        name: user?.name,
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedFields: Partial<IUserForm> = {};
    if (user) {
      for (const key in formState) {
        if (
          formState[key as keyof IUserForm] !== user[key as keyof IUserForm]
        ) {
          updatedFields[key as keyof IUserForm] =
            formState[key as keyof IUserForm];
        }
      }
    }
    mutate(updatedFields);
  };

  if (isLoading || isLoadingUser) {
    return <Loader />;
  }

  return (
    <>
      <form className="updateUser" onSubmit={handleSubmit}>
        <h1 className="updateUser-title">Редактировать</h1>
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
        <button type="submit">Обновить</button>
        <Link to="/" className="updateUser-iconlink">
          На главную
        </Link>
      </form>
    </>
  );
};
