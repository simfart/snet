import { useQuery } from 'react-query';
import { useMemo } from 'react';
import { getPostFn } from '../api/postApi';
import { QUERY_KEY } from 'shared/constants/queryKeys';

export const usePost = (postId: string) => {
  const {
    data: post,
    isLoading,
    error,
    isFetching,
  } = useQuery([QUERY_KEY.post, postId], () => getPostFn(postId)); // Передаем postId как ключ

  return useMemo(
    () => ({ post, isLoading, error, isFetching }),
    [post, error, isFetching, isLoading],
  );
};
