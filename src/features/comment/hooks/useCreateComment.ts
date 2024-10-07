import { useMutation, useQueryClient } from 'react-query';
import { createCommentFn } from '../api';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { useMemo } from 'react';
import { IPost } from 'entities/post/model/PostModel';
import { IComment } from '../model';
import { useCurrentUser } from 'features/auth/useCurrentUser';

interface CreateCommentInput {
  postId: string;
  text: string;
}

interface CreateCommentContext {
  previousPosts?: IPost[];
  previousPost?: IPost;
  previousUserPosts?: IPost[];
}

export const useCreateComment = (
  post: IPost,
  setPostData: (data: IPost) => void,
) => {
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser().user;

  const mutation = useMutation({
    mutationFn: async ({ postId, text }: CreateCommentInput) => {
      const newComment = await createCommentFn(postId, text);
      return newComment;
    },
    onMutate: async ({ text }) => {
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

      const newComment: IComment = {
        objectId: `temp-${Date.now()}`,
        text,
        user: currentUser,
        created: Date.now(),
      };

      setPostData({
        ...post,
        comments: [newComment, ...post.comments],
      });

      queryClient.setQueryData<IPost[]>([QUERY_KEY.posts], (oldPosts) => {
        if (!oldPosts) return [];
        return oldPosts.map((oldPost) =>
          oldPost.objectId === post.objectId
            ? { ...oldPost, comments: [...oldPost.comments, newComment] }
            : oldPost,
        );
      });
      queryClient.setQueryData<IPost[]>(
        [QUERY_KEY.userPosts, currentUser.objectId],
        (oldPosts) => {
          if (!oldPosts) return [];
          return oldPosts.map((oldPost) =>
            oldPost.objectId === post.objectId
              ? { ...oldPost, comments: [...oldPost.comments, newComment] }
              : oldPost,
          );
        },
      );

      return {
        previousPosts,
        previousPost,
        previousUserPosts,
      } as CreateCommentContext;
    },
    onError: (error, variables, context) => {
      const ctx = context as CreateCommentContext;

      if (ctx?.previousPosts) {
        queryClient.setQueryData([QUERY_KEY.posts], ctx.previousPosts);
      }

      if (ctx?.previousPost) {
        setPostData(ctx.previousPost);
      }

      if (ctx?.previousUserPosts) {
        queryClient.setQueryData([QUERY_KEY.userPosts], ctx.previousUserPosts);
      }

      console.error(error);
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
