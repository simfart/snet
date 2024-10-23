import { useMutation, useQueryClient } from 'react-query';
import { IPost } from 'entities/post/model/PostModel';
import { IUser } from 'entities/user/model/userModel';
import { useCurrentUser } from 'entities/user/hooks/useCurrentUser';
import { useCallback } from 'react';
import { QUERY_KEY } from 'shared/constants/queryKeys';

interface ToggleLikePostContext {
  previousData: (IPost[] | IPost | undefined)[];
}

export const useToggleLikePost = (
  mutationFn: (postId: string) => Promise<void>,
  invalidateKeys: (string | string[])[],
) => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useCurrentUser();

  const updateLikesOptimistically = useCallback(
    (post: IPost, currentUser: IUser): IPost => {
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
    },
    [],
  );

  const updatePostData = (
    oldPosts: IPost[] | undefined,
    postId: string,
    currentUser: IUser,
  ): IPost[] =>
    oldPosts?.map((post) =>
      post.objectId === postId
        ? updateLikesOptimistically(post, currentUser)
        : post,
    ) ?? [];

  const mutation = useMutation<void, unknown, string>(
    async (postId: string) => {
      await mutationFn(postId);
    },
    {
      onMutate: async (postId) => {
        await Promise.all(
          invalidateKeys.map((key) => queryClient.cancelQueries(key)),
        );

        const previousData = invalidateKeys.map((key) => {
          const data = queryClient.getQueryData<IPost[] | IPost>(key);
          return data;
        });

        invalidateKeys.forEach((key) => {
          queryClient.setQueryData<IPost[] | IPost | undefined>(
            key,
            (oldData: IPost[] | IPost | undefined) => {
              if (Array.isArray(oldData)) {
                return updatePostData(oldData, postId, currentUser);
              } else if (oldData && !Array.isArray(oldData)) {
                return updateLikesOptimistically(oldData, currentUser);
              }
              return oldData;
            },
          );
        });
        console.log('previousData', previousData);
        return { previousData } as ToggleLikePostContext;
      },

      onError: (err, __, context) => {
        const ctx = context as ToggleLikePostContext;
        if (ctx?.previousData) {
          ctx.previousData.forEach((previous, index) => {
            queryClient.setQueryData(invalidateKeys[index], previous);
          });
        }

        console.error('Error toggling like:', err);
      },

      onSuccess: () => {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries(key);
        });
      },

      onSettled: (_, __, postId) => {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries(key);
        });
        queryClient.refetchQueries([QUERY_KEY.posts]);
        queryClient.refetchQueries([QUERY_KEY.userPosts, currentUser.objectId]);
        queryClient.refetchQueries([QUERY_KEY.post, postId]);
      },
    },
  );

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
  };
};
