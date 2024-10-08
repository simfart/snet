import { getUserPostsFn } from 'entities/post/api/postApi';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';

export const useUserPosts = (userId: string | undefined) => {
  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery(
    [QUERY_KEY.userPosts, userId],
    () => getUserPostsFn(userId as string),
    {
      staleTime: 0,
      cacheTime: 0,
    },
  );

  const postsWithImages = useMemo(
    () => posts?.filter((post) => post.image && post.image !== ''),
    [posts],
  );
  return useMemo(
    () => ({ posts, isLoading, error, postsWithImages }),
    [error, isLoading, posts, postsWithImages],
  );
};
