import React from 'react';
import { fetchPosts, getPostWithUser } from 'entities/post/model/api';
import { PostCard } from 'features/post/ui/PostCard';
import { useQuery } from 'react-query';

export const PostList: React.FC = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery(['posts'], getPostWithUser);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
