import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Profile } from 'widgets/profile';
import { Header } from 'widgets/header';
import { PostList } from 'widgets/posts';
import { Tags } from 'widgets/tags';
import { CreatePostForm } from 'features/сreatePostForm';
import { useCurrentUser } from 'entities/user/hooks';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { Loader } from 'shared/ui';
import {
  usePosts,
  useSearchFilteredPosts,
  useTagFilteredPosts,
} from 'entities/post/hooks';
import styles from './HomePage.module.scss';

export const HomePage: FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchTermFromQuery = query.get('search');
  const tagIdFromQuery = query.get('tag');
  const searchTerm = searchTermFromQuery ? searchTermFromQuery : null;
  const selectedTagId = tagIdFromQuery ? tagIdFromQuery : null;
  const [selectedTagName, setselectedTagName] = useState('');

  const { posts, isLoading: isPostsLoading, error: postsError } = usePosts();

  const { foundPosts, isfoundPostsLoading, foundPostsError } =
    useSearchFilteredPosts(searchTerm);

  const { tagFilterPosts, isTagFilterPostsLoading, tagfilterPostsError } =
    useTagFilteredPosts(selectedTagId);

  const isSearching = !!searchTerm;
  const isFilteringByTag = !!selectedTagId;

  const displayedPosts = isFilteringByTag
    ? tagFilterPosts
    : isSearching
    ? foundPosts
    : posts;

  const isLoading = isSearching
    ? isfoundPostsLoading
    : isFilteringByTag
    ? isTagFilterPostsLoading
    : isPostsLoading;

  const error = isSearching
    ? foundPostsError
    : isFilteringByTag
    ? tagfilterPostsError
    : postsError;

  const navigate = useNavigate();
  const { user } = useCurrentUser();

  const handlePostClick = (postId: string) => {
    navigate('/post', { state: { selectedPost: postId } });
  };

  const handleTagClick = (tagId: string, tagName: string) => {
    navigate(`/?tag=${tagId}`);
    setselectedTagName(tagName);
  };
  if (error) {
    console.log(error);
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className={styles.homePage}>
      <Header
        selectedTagName={selectedTagId ? selectedTagName : ''}
        searchTerm={searchTerm}
      />
      <div className={styles.container}>
        <div className={styles.profileWrapper}>
          <Profile />
        </div>
        <div className={styles.createPostFormWrapper}>
          <CreatePostForm user={user} invalidateKeys={[QUERY_KEY.posts]} />
        </div>
        <div className={styles.postsWrapper}>
          <PostList
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
