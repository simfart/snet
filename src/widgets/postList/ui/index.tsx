import { FC } from 'react';

import { Loader } from 'shared/ui';
import { usePosts } from 'features/post/model/usePosts';
import { IPost } from 'entities/post/model/PostModel';
import { PostCard } from 'features/post';

export const PostList: FC = () => {
  const { posts, isLoading, error, isFetching } = usePosts();

  if (isLoading || isFetching) return <Loader />;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      {posts?.map((post: IPost) => (
        <PostCard key={post.objectId} post={post} />
      ))}
    </div>
  );
};
