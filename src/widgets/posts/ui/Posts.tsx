import { FC } from 'react';

import { Loader } from 'shared/ui';
import { usePosts } from 'features/post/hooks/usePosts';
import { IPost } from 'entities/post/model/PostModel';
// import { PostCard } from 'features/post';

import styles from './Posts.module.scss';
import { Post } from 'entities/post';
import { useUser } from 'features/auth/useUser';
import { CreatePostForm } from 'features/сreatePostForm/ui/CreatePostForm';
import { useFilteredPosts } from 'features/post/hooks/useFilteredPosts';

interface PostsProps {
  selectedTagId: string | null;
  onTagClick: (tagId: string) => void;
}

export const Posts: FC<PostsProps> = ({ selectedTagId, onTagClick }) => {
  const { posts, isLoading, error, isFetching } = usePosts();
  const { user } = useUser();

  const { filteredPosts, filteredPostsError, isFilteredPostsLoading } =
    useFilteredPosts(selectedTagId);

  if (isLoading || isFetching || isFilteredPostsLoading) return <Loader />;
  if (error || filteredPostsError)
    return (
      <div>
        Error: {((error as Error) || (filteredPostsError as Error))?.message}
      </div>
    );

  return (
    <div className={styles.postsContainer}>
      <CreatePostForm user={user} />
      <div className={styles.posts}>
        {(filteredPosts || posts)?.map((post: IPost) => (
          <Post key={post.objectId} post={post} onTagClick={onTagClick} />
        ))}
      </div>
    </div>
  );
};
