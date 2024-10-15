import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { useMemo } from 'react';
import { createPost } from 'entities/post/api/postApi';
import { createTag, linkTagsToPost } from 'entities/tag/api/tagsApi';
import { useUser } from 'features/auth/useUser';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const currentUser = useUser().user;

  const mutation = useMutation({
    mutationFn: async ({
      description,
      image,
      tags,
    }: {
      description: string;
      image: string;
      tags: string[];
    }) => {
      const post = await createPost({ description, image });

      const tagIds: string[] = [];
      for (const tagName of tags) {
        try {
          const tag = await createTag(tagName);
          tagIds.push(tag.objectId);
        } catch (error) {
          console.error(error);
        }
      }

      if (post && tagIds.length > 0) {
        await linkTagsToPost(post.objectId, tagIds);
      }

      return post;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.posts]);
      queryClient.invalidateQueries([QUERY_KEY.tags]);
      queryClient.invalidateQueries([
        QUERY_KEY.userPosts,
        currentUser.objectId,
      ]);
      queryClient.refetchQueries([QUERY_KEY.posts]);
      queryClient.refetchQueries([QUERY_KEY.userPosts, currentUser.objectId]);
    },
    onSettled: () => {
      queryClient.invalidateQueries([QUERY_KEY.posts]);
      queryClient.invalidateQueries([
        QUERY_KEY.userPosts,
        currentUser.objectId,
      ]);
    },
    onError: (err) => {
      console.error(err);
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
