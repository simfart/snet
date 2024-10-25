import { useMutation, useQueryClient } from 'react-query';
import { IPost } from 'entities/post/model/PostModel';
import { useCurrentUser } from 'entities/user/hooks';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { IComment } from '../model/CommentModel';
import { createCommentFn } from '../api';

interface CreateCommentInput {
  postId: string;
  text: string;
}

interface CreateCommentContext {
  previousPost?: IPost;
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
      await queryClient.cancelQueries([QUERY_KEY.post, post.objectId]);

      const previousPost = queryClient.getQueryData<IPost[]>([
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

      return { previousPost } as CreateCommentContext;
    },
    onError: (error, _, context) => {
      const ctx = context as CreateCommentContext;

      if (ctx?.previousPost) {
        setPostData(ctx.previousPost);
      }
      console.error('Error creating comment:', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.userPosts, post.user.objectId]);
    },
    onSettled: () => {
      queryClient.refetchQueries([QUERY_KEY.userPosts, post.user.objectId]);
      queryClient.refetchQueries([QUERY_KEY.posts]);
      queryClient.invalidateQueries([QUERY_KEY.post, post.objectId]);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
  };
};
