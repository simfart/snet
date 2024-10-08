import { getPostsFn } from 'entities/post/api/postApi';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';

export const usePosts = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery(QUERY_KEY.posts, getPostsFn, {
    staleTime: 0,
    cacheTime: 0,
  });

  return useMemo(
    () => ({ posts, isLoading, error }),
    [error, isLoading, posts],
  );
};
