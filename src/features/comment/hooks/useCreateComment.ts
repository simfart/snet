import { useMutation, useQueryClient } from 'react-query';
import { createCommentFn } from '../api';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { useMemo } from 'react';

interface CreateCommentInput {
  postId: string;
  text: string;
}

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ postId, text }: CreateCommentInput) => {
      const newComment = await createCommentFn(postId, text);
      return newComment;
    },
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY.post]);
      queryClient.invalidateQueries([QUERY_KEY.posts]);
      queryClient.invalidateQueries([QUERY_KEY.comments]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return useMemo(
    () => ({ mutate: mutation.mutate, isLoading: mutation.isLoading }),
    [mutation.isLoading, mutation.mutate],
  );
};
