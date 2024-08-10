import { useUser } from 'features/auth/useUser';
import { FC } from 'react';
import { Header } from 'widgets/header';

import styles from './HomePage.module.scss';
import { Link } from 'react-router-dom';
import { Profile } from 'widgets/profile';

export const HomePage: FC = () => {
  const { user, isLoading: isLoadingUser } = useUser();
  return (
    <section className={styles.homePage}>
      <Header />
      <div className={styles.container}>
        <Profile />
        <div className={styles.posts}>bbbb</div>
        <div className={styles.tags}>
          bbb
          <Link to="/update" className="updateUser-iconlink">
            Редактировать
          </Link>
        </div>
      </div>
      {/* <Link to="/login">Login</Link>
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
      </div> */}
    </section>
  );
};
