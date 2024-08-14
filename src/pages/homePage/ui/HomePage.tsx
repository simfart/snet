import { FC } from 'react';
import { Profile } from 'widgets/profile';
import { Header } from 'widgets/header';

import styles from './HomePage.module.scss';
import { Post } from 'entities/post';
import { Posts } from 'widgets/posts';

export const HomePage: FC = () => {
  return (
    <section className={styles.homePage}>
      <Header />
      <div className={styles.container}>
        <Profile />
        <Posts />
        <div className={styles.tags}>тут будут теги</div>
      </div>
    </section>
  );
};
