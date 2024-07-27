import { useLogout } from 'pages/auth/ui/hooks';
import { useUser } from 'pages/auth/ui/hooks/useUser';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from 'shared/ui';

export const HomePage: FC = () => {
  const { user, isLoading: isLoadingUser } = useUser();
  const { mutate: logout, isLoading } = useLogout();

  const onLogoutClick = () => {
    logout();
  };

  if (isLoading || isLoadingUser) return <Loader />;

  return (
    <div className="home-page">
      <Link to="/login">Login</Link>
      <button onClick={onLogoutClick}>Logout</button>
      <Link to="/update" className="updateUser-iconlink">
        Редактировать
      </Link>
      <div>{user?.name}</div>
      <div>{user?.email}</div>
    </div>
  );
};
