import { FC } from 'react';
import { Profile } from 'widgets/profile';
import { Header } from 'widgets/header';

import styles from './HomePage.module.scss';

export const HomePage: FC = () => {
  return (
    <section className={styles.homePage}>
      <Header />
      <div className={styles.container}>
        <Profile />
        <div className={styles.posts}>Тут посты</div>
        <div className={styles.tags}>тут будут теги</div>
      </div>
    </section>
  );
};
