import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { getPostsFn } from '../api';

export const usePosts = () => {
  const {
    data: posts,
    isLoading,
    error,
    isFetching,
  } = useQuery(QUERY_KEY.posts, getPostsFn);
  return useMemo(
    () => ({ posts, isLoading, error, isFetching }),
    [error, isFetching, isLoading, posts],
  );
};
