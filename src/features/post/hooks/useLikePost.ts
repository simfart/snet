import { likePostFn } from 'entities/post/api/postApi';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';

export const useLikePost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: likePostFn,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.posts]);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return useMemo(
    () => ({
      mutate: mutation.mutate,
      isLoading: mutation.isLoading,
    }),
    [mutation.mutate, mutation.isLoading],
  );
};
