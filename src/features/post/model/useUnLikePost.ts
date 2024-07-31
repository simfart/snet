import { unLikePostFn } from 'entities/post/model/api';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';

export const useUnLikePost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: unLikePostFn,
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
