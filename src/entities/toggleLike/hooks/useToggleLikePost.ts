import { useMutation, useQueryClient } from 'react-query';
import { useMemo } from 'react';
import { QUERY_KEY } from 'shared/constants/queryKeys';

export const useToggleLikePost = (
  mutationFn: (postId: string) => Promise<void>,
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.posts]);
      queryClient.invalidateQueries([QUERY_KEY.filteredPosts]);
      queryClient.invalidateQueries([QUERY_KEY.userPosts]);
      queryClient.invalidateQueries([QUERY_KEY.post]);
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
