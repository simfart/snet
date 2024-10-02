import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { IPost } from 'entities/post/model/PostModel';
import { useUser } from 'features/auth/useUser';
import { IUser } from 'entities/user/model/userModel';

interface ToggleLikePostContext {
  previousPosts?: IPost[];
  previousPost?: IPost;
  previousUserPosts?: IPost[];
}

const updateLikesOptimistically = (post: IPost, currentUser: IUser): IPost => {
  const userLiked = post.likes.some(
    (user) => user.objectId === currentUser.objectId,
  );
  const likesCount = post.likesCount ?? 0;
  return {
    ...post,
    likes: userLiked
      ? post.likes.filter((user) => user.objectId !== currentUser.objectId)
      : [...post.likes, currentUser],
    likesCount: likesCount + (userLiked ? -1 : 1),
  };
};

export const useToggleLikePost = (
  mutationFn: (postId: string) => Promise<void>,
) => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useUser();

  const mutation = useMutation<void, unknown, string>(
    async (postId: string) => {
      await mutationFn(postId);
    },
    {
      onMutate: async (postId) => {
        await queryClient.cancelQueries([QUERY_KEY.posts]);
        await queryClient.cancelQueries([QUERY_KEY.post, postId]);
        await queryClient.cancelQueries([
          QUERY_KEY.userPosts,
          currentUser.objectId,
        ]);

        const previousPosts = queryClient.getQueryData<IPost[]>([
          QUERY_KEY.posts,
        ]);
        const previousUserPosts = queryClient.getQueryData<IPost[]>([
          QUERY_KEY.userPosts,
          currentUser.objectId,
        ]);
        const previousPost = queryClient.getQueryData<IPost>([
          QUERY_KEY.post,
          postId,
        ]);

        queryClient.setQueryData<IPost[]>([QUERY_KEY.posts], (oldPosts) => {
          if (!oldPosts) return [];
          return oldPosts.map((post) =>
            post.objectId === postId
              ? updateLikesOptimistically(post, currentUser)
              : post,
          );
        });
        queryClient.setQueryData<IPost[]>(
          [QUERY_KEY.userPosts, currentUser.objectId],
          (oldUserPosts) => {
            if (!oldUserPosts) return [];
            return oldUserPosts.map((post) =>
              post.objectId === postId
                ? updateLikesOptimistically(post, currentUser)
                : post,
            );
          },
        );
        queryClient.setQueryData<IPost | undefined>(
          [QUERY_KEY.post, postId],
          (oldPost) => {
            if (!oldPost) return oldPost;
            return {
              ...oldPost,
              ...updateLikesOptimistically(oldPost, currentUser),
            } as IPost;
          },
        );

        return {
          previousPosts,
          previousPost,
          previousUserPosts,
        } as ToggleLikePostContext;
      },
      onError: (err, postId, context) => {
        const ctx = context as ToggleLikePostContext;

        if (ctx?.previousPosts) {
          queryClient.setQueryData<IPost[]>(
            [QUERY_KEY.posts],
            ctx.previousPosts,
          );
        }

        if (ctx?.previousPost) {
          queryClient.setQueryData<IPost>(
            [QUERY_KEY.post, postId],
            ctx.previousPost,
          );
        }

        if (ctx?.previousUserPosts) {
          queryClient.setQueryData<IPost[]>(
            [QUERY_KEY.userPosts, currentUser.objectId],
            ctx.previousUserPosts,
          );
        }

        console.error(err);
      },
      onSettled: (data, error, postId) => {
        queryClient.invalidateQueries([QUERY_KEY.posts]);
        queryClient.invalidateQueries([QUERY_KEY.userPosts]);
        queryClient.invalidateQueries([QUERY_KEY.post, postId]);
      },
    },
  );

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
  };
};
