import { useMutation, useQueryClient } from 'react-query';
import { createPost } from 'entities/post/model/api';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { useMemo } from 'react';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationKey: [],
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.posts]);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return useMemo(() => ({ mutate, isLoading }), [mutate, isLoading]);
};
