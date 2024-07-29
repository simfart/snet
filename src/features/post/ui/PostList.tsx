import { FC } from 'react';
import { PostCard } from 'features/post/ui/PostCard';
import { Loader } from 'shared/ui';
import { Post } from 'entities/post/model/types';
import { usePosts } from '../model/usePosts';

export const PostList: FC = () => {
  const { posts, isLoading, error, isFetching } = usePosts();

  if (isLoading || isFetching) return <Loader />;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      {posts?.map((post: Post) => (
        <PostCard key={post.objectId} post={post} />
      ))}
    </div>
  );
};
