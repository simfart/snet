import { getPostFn } from 'entities/post/model/api';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';

export const usePosts = () => {
  const {
    data: posts,
    isLoading,
    error,
    isFetching,
  } = useQuery(QUERY_KEY.posts, getPostFn);

  return useMemo(
    () => ({ posts, isLoading, error, isFetching }),
    [error, isFetching, isLoading, posts],
  );
};
