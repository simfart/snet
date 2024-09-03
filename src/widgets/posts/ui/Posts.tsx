import { FC } from 'react';

import { Loader } from 'shared/ui';
import { usePosts } from 'features/post/model/usePosts';
import { IPost } from 'entities/post/model/PostModel';
import { PostCard } from 'features/post';

import styles from './Posts.module.scss';
import { Post } from 'entities/post';
import { CreatePostForm } from 'features/сreatePostForm';
import { useUser } from 'features/auth/useUser';

export const Posts: FC = () => {
  const { posts, isLoading, error, isFetching } = usePosts();
  const { user } = useUser();

  if (isLoading || isFetching) return <Loader />;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className={styles.postsContainer}>
      <CreatePostForm name={user?.name} avatar={user?.avatar} />
      <div className={styles.posts}>
        {posts?.map((post: IPost) => (
          <Post key={post.objectId} post={post} />
        ))}
      </div>
    </div>
  );
};
