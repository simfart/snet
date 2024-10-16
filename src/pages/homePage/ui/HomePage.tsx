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
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { usePosts } from 'entities/post/hooks/usePosts';
import { Loader } from 'shared/ui';
import { useTagFilteredPosts } from 'features/post/hooks/useTagFilteredPosts';
import { useSearchFilteredPosts } from 'features/post/hooks/useSearchFilteredPosts';
import { IPost } from 'entities/post/model/PostModel';

export const HomePage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const { searchTerm, setSearchTerm } = useSearchStore();
  const { user } = useCurrentUser();
  const { posts, isLoading: isPostsLoading } = usePosts();

  const { filteredPosts, isFilteredPostsLoading } =
    useTagFilteredPosts(selectedTagId);
  const { foundPosts, isfoundPostsLoading } =
    useSearchFilteredPosts(searchTerm);

  const [displayedPosts, setDisplayedPosts] = useState<IPost[]>(posts || []);

  const handlePostClick = (postId: string) => {
    navigate('/post', { state: { selectedPost: postId } });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tagIdFromUrl = searchParams.get('tag');
    const searchTermFromUrl = searchParams.get('search');

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
      setDisplayedPosts(foundPosts || []);
    } else if (tagIdFromUrl) {
      setSelectedTagId(tagIdFromUrl);
      setDisplayedPosts(filteredPosts || []);
    } else {
      setSearchTerm('');
      setSelectedTagId(null);
      setDisplayedPosts(posts || []);
    }
  }, [location, foundPosts, filteredPosts, posts, setSearchTerm]);

  console.log(foundPosts);

  const handleTagClick = (tagId: string, tagName: string) => {
    setSelectedTagId(tagId);
    setSearchTerm(`#${tagName}`);
    navigate(`/?tag=${tagId}`);
  };

  const clearSelectedTag = () => {
    setSelectedTagId(null);
  };

  if (isPostsLoading || isFilteredPostsLoading || isfoundPostsLoading) {
    return <Loader />;
  }

  return (
    <section className={styles.homePage}>
      <Header clearSelectedTag={clearSelectedTag} />
      <div className={styles.container}>
        <div className={styles.profileWrapper}>
          <Profile />
        </div>
        <div className={styles.createPostFormWrapper}>
          <CreatePostForm user={user} invalidateKeys={[QUERY_KEY.posts]} />
        </div>
        <div className={styles.postsWrapper}>
          <Posts
            selectedTagId={selectedTagId}
            onTagClick={handleTagClick}
            searchTerm={searchTerm}
            onPostClick={handlePostClick}
            posts={displayedPosts}
          />
        </div>
        <div className={styles.tagsWrapper}>
          <Tags selectedTagId={selectedTagId} onTagClick={handleTagClick} />
        </div>
      </div>
    </section>
  );
};
