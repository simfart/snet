import { FC } from 'react';

import { Loader } from 'shared/ui';
import { usePosts } from 'features/post/hooks/usePosts';
import { IPost } from 'entities/post/model/PostModel';

import styles from './Posts.module.scss';
import { Post } from 'entities/post';
import { useUser } from 'features/auth/useUser';
import { CreatePostForm } from 'features/сreatePostForm/ui/CreatePostForm';
import { useTagFilteredPosts } from 'features/post/hooks/useTagFilteredPosts';
import { useSearchFilteredPosts } from 'features/post/hooks/useSearchFilteredPosts';

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
  const { user } = useUser();

  const { filteredPosts, isFilteredPostsLoading } =
    useTagFilteredPosts(selectedTagId);

  const { foundPosts, isfoundPostsLoading } =
    useSearchFilteredPosts(searchTerm);

  if (isLoading || isFilteredPostsLoading || isfoundPostsLoading)
    return <Loader />;

  return (
    <div className={styles.postsContainer}>
      <div className={styles.createPostFormWrapper}>
        <CreatePostForm user={user} />
      </div>
      <div className={styles.posts}>
        {(filteredPosts || foundPosts || posts)?.map((post: IPost) => (
          <Post
            key={post.objectId}
            post={post}
            onTagClick={onTagClick}
            onPostClick={onPostClick}
          />
        ))}
      </div>
    </div>
  );
};
