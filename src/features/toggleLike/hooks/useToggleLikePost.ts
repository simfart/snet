import { useMutation, useQueryClient } from 'react-query';
import { useMemo } from 'react';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { IPost } from 'entities/post/model/PostModel';
import { useUser } from 'features/auth/useUser';
import { IUser } from 'entities/user/model/userModel';

interface ToggleLikePostContext {
  previousPosts?: IPost[];
}

const updateLikes = (post: IPost, currentUser: IUser) => {
  const userLiked = post.likes.some(
    (user) => user.objectId === currentUser.objectId,
  );

  return {
    ...post,
    likes: userLiked
      ? post.likes.filter((user) => user.objectId !== currentUser.objectId)
      : [...post.likes, currentUser],
    likesCount: post.likesCount! + (userLiked ? -1 : 1),
  };
};

export const useToggleLikePost = (
  mutationFn: (postId: string) => Promise<void>,
) => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useUser();

  const mutation = useMutation<void, unknown, string>(
    async (postId: string) => {
      await queryClient.cancelQueries([QUERY_KEY.posts]);

      queryClient.setQueryData<IPost[]>([QUERY_KEY.posts], (oldPosts) => {
        if (!oldPosts) return [];

        return oldPosts.map((post) =>
          post.objectId === postId ? updateLikes(post, currentUser) : post,
        );
      });

      await mutationFn(postId);
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries([QUERY_KEY.posts]);
        const previousPosts = queryClient.getQueryData<IPost[]>([
          QUERY_KEY.posts,
        ]);

        return { previousPosts } as ToggleLikePostContext;
      },
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.posts]);
        queryClient.invalidateQueries([QUERY_KEY.filteredPosts]);
        queryClient.invalidateQueries([QUERY_KEY.userPosts]);
        queryClient.invalidateQueries([QUERY_KEY.post]);
      },
      onError: (err, postId, context) => {
        const ctx = context as ToggleLikePostContext;

        if (ctx?.previousPosts) {
          queryClient.setQueryData<IPost[]>(
            [QUERY_KEY.posts],
            ctx.previousPosts,
          );
        }
        console.error(err);
      },
      onSettled: () => {
        queryClient.invalidateQueries([QUERY_KEY.posts]);
      },
    },
  );

  return useMemo(
    () => ({
      mutate: mutation.mutate,
      isLoading: mutation.isLoading,
    }),
    [mutation.mutate, mutation.isLoading],
  );
};
