import { FC, useState } from 'react';
import { Profile } from 'widgets/profile';
import { Header } from 'widgets/header';
import { Posts } from 'widgets/posts';
import { Tags } from 'widgets/tags';

import styles from './HomePage.module.scss';

export const HomePage: FC = () => {
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

  return (
    <section className={styles.homePage}>
      <Header />
      <div className={styles.container}>
        <Profile />
        <Posts selectedTagId={selectedTagId} onTagClick={setSelectedTagId} />
        <Tags selectedTagId={selectedTagId} onTagClick={setSelectedTagId} />
      </div>
    </section>
  );
};
