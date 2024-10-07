import { IPost } from 'entities/post/model/PostModel';
import { useMutation, useQueryClient } from 'react-query';
import { deleteCommentFn } from '../api';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { useMemo } from 'react';
import { useCurrentUser } from 'features/auth/useCurrentUser';

interface DeleteCommentInput {
  commentId: string;
  postId: string;
}

interface DeleteCommentContext {
  previousPosts?: IPost[];
  previousPost?: IPost;
  previousUserPosts?: IPost[];
}

export const useDeleteComment = (
  post: IPost,
  setPostData: (data: IPost) => void,
) => {
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser().user;

  const mutation = useMutation({
    mutationFn: async ({ commentId, postId }: DeleteCommentInput) => {
      await deleteCommentFn(commentId, postId);
      return commentId;
    },
    onMutate: async ({ commentId }) => {
      await queryClient.cancelQueries([QUERY_KEY.posts]);
      await queryClient.cancelQueries([QUERY_KEY.post, post.objectId]);
      await queryClient.cancelQueries([
        QUERY_KEY.userPosts,
        currentUser.objectId,
      ]);

      const previousUserPosts = queryClient.getQueryData<IPost[]>([
        QUERY_KEY.userPosts,
        currentUser.objectId,
      ]);
      const previousPosts = queryClient.getQueryData<IPost[]>([
        QUERY_KEY.posts,
      ]);
      const previousPost = queryClient.getQueryData<IPost>([
        QUERY_KEY.post,
        post.objectId,
      ]);

      const updatedComments = post.comments.filter(
        (comment) => comment.objectId !== commentId,
      );

      setPostData({
        ...post,
        comments: updatedComments,
      });

      queryClient.setQueryData<IPost[]>([QUERY_KEY.posts], (oldPosts) => {
        if (!oldPosts) return [];
        return oldPosts.map((oldPost) =>
          oldPost.objectId === post.objectId
            ? { ...oldPost, comments: updatedComments }
            : oldPost,
        );
      });

      queryClient.setQueryData<IPost[]>(
        [QUERY_KEY.userPosts, currentUser.objectId],
        (oldPosts) => {
          if (!oldPosts) return [];
          return oldPosts.map((oldPost) =>
            oldPost.objectId === post.objectId
              ? { ...oldPost, comments: updatedComments }
              : oldPost,
          );
        },
      );

      return {
        previousPosts,
        previousPost,
        previousUserPosts,
      } as DeleteCommentContext;
    },
    onError: (error, variables, context) => {
      const ctx = context as DeleteCommentContext;

      if (ctx?.previousPosts) {
        queryClient.setQueryData([QUERY_KEY.posts], ctx.previousPosts);
      }

      if (ctx?.previousPost) {
        setPostData(ctx.previousPost);
      }

      if (ctx?.previousUserPosts) {
        queryClient.setQueryData(
          [QUERY_KEY.userPosts, currentUser.objectId],
          ctx.previousUserPosts,
        );
      }

      console.error('Error deleting comment:', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.posts]);
      queryClient.invalidateQueries([QUERY_KEY.post, post.objectId]);
    },
    onSettled: () => {
      queryClient.invalidateQueries([QUERY_KEY.posts]);
      queryClient.invalidateQueries([QUERY_KEY.post, post.objectId]);
    },
  });

  return useMemo(
    () => ({ mutate: mutation.mutate, isLoading: mutation.isLoading }),
    [mutation.isLoading, mutation.mutate],
  );
};
