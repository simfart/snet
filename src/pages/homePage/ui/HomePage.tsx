import { FC, useEffect, useState } from 'react';
import { Profile } from 'widgets/profile';
import { Header } from 'widgets/header';
import { Posts } from 'widgets/posts';
import { Tags } from 'widgets/tags';
import { CreatePostForm } from 'features/сreatePostForm/ui/CreatePostForm';

import styles from './HomePage.module.scss';
import { useUser } from 'features/auth/useUser';
import { useSearchStore } from 'features/searchForm/model/useSearchStore';
import { useLocation } from 'react-router-dom';

export const HomePage: FC = () => {
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const { searchTerm, setSearchTerm } = useSearchStore();
  const { user } = useUser();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTermFromUrl = searchParams.get('search');

  useEffect(() => {
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [searchTermFromUrl, setSearchTerm]);

  return (
    <section className={styles.homePage}>
      <Header />
      <div className={styles.container}>
        <div className={styles.profileWrapper}>
          <Profile />
        </div>
        <div className={styles.createPostFormWrapper}>
          <CreatePostForm user={user} />
        </div>
        <div className={styles.postsWrapper}>
          <Posts
            selectedTagId={selectedTagId}
            onTagClick={setSelectedTagId}
            searchTerm={searchTerm}
          />
        </div>
        <div className={styles.tagsWrapper}>
          <Tags selectedTagId={selectedTagId} onTagClick={setSelectedTagId} />
        </div>
      </div>
    </section>
  );
};
