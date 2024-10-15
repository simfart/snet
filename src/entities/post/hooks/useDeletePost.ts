import { useMemo } from 'react';
import { deletePostFn } from 'entities/post/api/postApi';
import { useMutation, useQueryClient } from 'react-query';
import { IPost } from '../model/PostModel';

interface DeletePostContext {
  previousData?: IPost[][];
}

export const useDeletePost = (invalidateKeys: (string | string[])[]) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePostFn,

    onMutate: async (postId: string) => {
      await Promise.all(
        invalidateKeys.map((key) => queryClient.cancelQueries(key)),
      );

      const previousData = invalidateKeys.map(
        (key) => queryClient.getQueryData<IPost[]>(key) || [],
      );

      invalidateKeys.forEach((key, index) => {
        queryClient.setQueryData<IPost[]>(key, (oldPosts = []) =>
          oldPosts.filter((post) => post.objectId !== postId),
        );
      });

      return { previousData } as DeletePostContext;
    },

    onSuccess: () => {
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries(key);
      });
    },

    onError: (error, postId, context) => {
      const ctx = context as DeletePostContext;

      if (ctx?.previousData) {
        ctx.previousData.forEach((previous, index) => {
          queryClient.setQueryData(invalidateKeys[index], previous);
        });
      }

      console.error('Error deleting post:', error);
    },

    onSettled: () => {
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries(key);
      });
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
