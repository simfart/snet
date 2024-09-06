import { FC } from 'react';
import { Profile } from 'widgets/profile';
import { Header } from 'widgets/header';

import styles from './HomePage.module.scss';
import { Posts } from 'widgets/posts';
import { Topics } from 'widgets/topics';

export const HomePage: FC = () => {
  return (
    <section className={styles.homePage}>
      <Header />
      <div className={styles.container}>
        <Profile />
        <Posts />
        <Topics />
      </div>
    </section>
  );
};
