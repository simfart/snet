import { FC } from 'react';

import { Loader } from 'shared/ui';
import { usePosts } from 'features/post/hooks/usePosts';
import { IPost } from 'entities/post/model/PostModel';

import styles from './Posts.module.scss';
import { Post } from 'entities/post';
import { CreatePostForm } from 'features/сreatePostForm/ui/CreatePostForm';
import { useTagFilteredPosts } from 'features/post/hooks/useTagFilteredPosts';
import { useSearchFilteredPosts } from 'features/post/hooks/useSearchFilteredPosts';
import { useCurrentUser } from 'features/auth/useCurrentUser';
import { QUERY_KEY } from 'shared/constants/queryKeys';

interface PostsProps {
  selectedTagId: string | null;
  searchTerm: string | null;
  onTagClick: (tagId: string, tagName: string) => void;
  onPostClick: (post: string) => void;
}

export const Posts: FC<PostsProps> = ({
  selectedTagId,
  onTagClick,
  searchTerm,
  onPostClick,
}) => {
  const { posts, isLoading } = usePosts();
  const { user } = useCurrentUser();

  const { filteredPosts, isFilteredPostsLoading } =
    useTagFilteredPosts(selectedTagId);

  const { foundPosts, isfoundPostsLoading } =
    useSearchFilteredPosts(searchTerm);

  if (isLoading || isFilteredPostsLoading || isfoundPostsLoading)
    return <Loader />;

  return (
    <div className={styles.postsContainer}>
      <div className={styles.createPostFormWrapper}>
        <CreatePostForm user={user} invalidateKeys={[QUERY_KEY.posts]} />
      </div>
      <div className={styles.posts}>
        {(filteredPosts || foundPosts || posts)?.map((post: IPost) => (
          <Post
            key={post.objectId}
            post={post}
            onTagClick={onTagClick}
            onPostClick={onPostClick}
            invalidateKeys={[QUERY_KEY.posts]}
          />
        ))}
      </div>
    </div>
  );
};
