import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { useMemo } from 'react';
import { createPost } from 'entities/post/api/postApi';

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
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
