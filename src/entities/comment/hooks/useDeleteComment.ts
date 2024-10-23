import { useMutation, useQueryClient } from 'react-query';
import { useCurrentUser } from 'entities/user/hooks/useCurrentUser';
import { IPost } from 'entities/post/model/PostModel';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { deleteCommentFn } from '../api';

interface DeleteCommentInput {
  commentId: string;
  postId: string;
}

interface DeleteCommentContext {
  previousPost?: IPost;
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
      await queryClient.cancelQueries([QUERY_KEY.post, post.objectId]);

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

      return {
        previousPost,
      } as DeleteCommentContext;
    },
    onError: (error, variables, context) => {
      const ctx = context as DeleteCommentContext;

      if (ctx?.previousPost) {
        setPostData(ctx.previousPost);
      }

      console.error('Error deleting comment:', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.post, post.objectId]);
    },
    onSettled: () => {
      queryClient.refetchQueries([QUERY_KEY.userPosts, currentUser.objectId]);
      queryClient.refetchQueries([QUERY_KEY.posts]);
      queryClient.invalidateQueries([QUERY_KEY.post, post.objectId]);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
  };
};
