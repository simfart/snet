import { FC, useEffect, useState } from 'react';
import { Profile } from 'widgets/profile';
import { Header } from 'widgets/header';
import { Posts } from 'widgets/posts';
import { Tags } from 'widgets/tags';
import { CreatePostForm } from 'features/сreatePostForm/ui/CreatePostForm';
import { useSearchStore } from 'features/searchForm/model/useSearchStore';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './HomePage.module.scss';
import { useCurrentUser } from 'features/auth/useCurrentUser';

export const HomePage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const { searchTerm, setSearchTerm } = useSearchStore();
  const { user } = useCurrentUser();

  const handlePostClick = (postId: string) => {
    navigate('/post', { state: { selectedPost: postId } });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tagIdFromUrl = searchParams.get('tag');
    const searchTermFromUrl = searchParams.get('search');

    if (!tagIdFromUrl && !searchTermFromUrl) {
      setSearchTerm('');
      setSelectedTagId(null);
    }
  }, [location, setSearchTerm]);

  const handleTagClick = (tagId: string, tagName: string) => {
    setSelectedTagId(tagId);
    setSearchTerm(`#${tagName}`);
    navigate(`/?tag=${tagId}`);
  };

  const clearSelectedTag = () => {
    setSelectedTagId(null);
  };

  return (
    <section className={styles.homePage}>
      <Header clearSelectedTag={clearSelectedTag} />
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
            onTagClick={handleTagClick}
            searchTerm={searchTerm}
            onPostClick={handlePostClick}
          />
        </div>
        <div className={styles.tagsWrapper}>
          <Tags selectedTagId={selectedTagId} onTagClick={handleTagClick} />
        </div>
      </div>
    </section>
  );
};
