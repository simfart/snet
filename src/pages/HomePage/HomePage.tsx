import { CreatePostForm } from 'features/post/model/CreatePostForm';
import { PostList } from 'features/post/ui/PostList';
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
      <div>{user?.avatar}</div>
      <div>{user?.about}</div>
      <div>
        <h1>Posts</h1>
        <Link to="/posts">Posts</Link>
      </div>
    </div>
  );
};
