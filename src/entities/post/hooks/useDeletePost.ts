import { useMemo } from 'react';
import { deletePostFn } from 'entities/post/api/postApi';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deletePostFn,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.posts]);
      queryClient.invalidateQueries([QUERY_KEY.filteredPosts]);
      queryClient.invalidateQueries([QUERY_KEY.userPosts]);
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
