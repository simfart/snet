import { useMutation, useQueryClient } from 'react-query';
import { createCommentFn } from '../api';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { useMemo } from 'react';

interface CreateCommentInput {
  userId: string;
  postId: string;
  content: string;
}

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ userId, postId, content }: CreateCommentInput) => {
      const newComment = await createCommentFn(userId, postId, content);
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
