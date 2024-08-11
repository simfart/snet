import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Profile } from 'widgets/profile';
import { Header } from 'widgets/header';

import styles from './HomePage.module.scss';

export const HomePage: FC = () => {
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
    </section>
  );
};
