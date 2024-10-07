import { useMemo } from 'react';
import { deletePostFn } from 'entities/post/api/postApi';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { IPost } from '../model/PostModel';
import { useCurrentUser } from 'features/auth/useCurrentUser';

interface DeletePostContext {
  previousPosts?: IPost[];
  previousUserPosts?: IPost[];
}

export const useDeletePost = () => {
  const currentUser = useCurrentUser().user;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePostFn,

    onMutate: async (postId: string) => {
      await queryClient.cancelQueries([
        QUERY_KEY.posts,
        QUERY_KEY.userPosts,
        currentUser.objectId,
      ]);

      const previousPosts =
        queryClient.getQueryData<IPost[]>([QUERY_KEY.posts]) || [];
      const previousUserPosts =
        queryClient.getQueryData<IPost[]>([
          QUERY_KEY.userPosts,
          currentUser.objectId,
        ]) || [];

      const updatedPosts = previousPosts.filter(
        (post) => post.objectId !== postId,
      );
      const updatedUserPosts = previousUserPosts.filter(
        (post) => post.objectId !== postId,
      );

      queryClient.setQueryData<IPost[]>([QUERY_KEY.posts], updatedPosts);
      queryClient.setQueryData<IPost[]>(
        [QUERY_KEY.userPosts, currentUser.objectId],
        updatedUserPosts,
      );

      return { previousPosts, previousUserPosts } as DeletePostContext;
    },

    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.posts]);
      queryClient.invalidateQueries([
        QUERY_KEY.userPosts,
        currentUser.objectId,
      ]);
    },

    onError: (error, postId, context) => {
      const ctx = context as DeletePostContext;

      if (ctx) {
        if (ctx.previousPosts) {
          queryClient.setQueryData([QUERY_KEY.posts], ctx.previousPosts);
        }
        if (ctx.previousUserPosts) {
          queryClient.setQueryData(
            [QUERY_KEY.userPosts, currentUser.objectId],
            ctx.previousUserPosts,
          );
        }
      }

      console.error('Error deleting post:', error);
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
