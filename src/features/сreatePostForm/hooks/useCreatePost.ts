import { useMutation, useQueryClient } from 'react-query';
import { useMemo } from 'react';
import { createPost } from 'entities/post/api/postApi';
import { createTag, linkTagsToPost } from 'entities/tag/api/tagsApi';
import { IPost } from 'entities/post/model/PostModel';
import { useCurrentUser } from 'features/auth/useCurrentUser';
import { QUERY_KEY } from 'shared/constants/queryKeys';

export const useCreatePost = (invalidateKeys: (string | string[])[]) => {
  const currentUser = useCurrentUser().user;
  const queryClient = useQueryClient();

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

    onMutate: async (newPost) => {
      await queryClient.cancelQueries(invalidateKeys);
      const previousData = invalidateKeys.map((key) =>
        queryClient.getQueryData<IPost[]>(key),
      );

      invalidateKeys.forEach((key) => {
        queryClient.setQueryData<IPost[]>(key, (oldPosts = []) => {
          const optimisticPost: IPost = {
            objectId: `temp-${Math.random().toString()}`,
            description: newPost.description,
            image: newPost.image,
            tags: [],
            created: Date.now(),
            comments: [],
            likes: [],
            user: currentUser,
          };

          return [optimisticPost, ...oldPosts];
        });
      });

      return { previousData };
    },

    onSuccess: (resultPost) => {
      invalidateKeys.forEach((key) => {
        queryClient.setQueryData<IPost[]>(key, (oldPosts = []) => {
          return oldPosts.map((post) =>
            post.objectId.startsWith('temp-') ? resultPost : post,
          );
        });
      });
      queryClient.invalidateQueries([QUERY_KEY.tags]);
    },

    onError: (error, _, context) => {
      console.error(error);
      context?.previousData.forEach((previous, index) => {
        queryClient.setQueryData(invalidateKeys[index], previous);
      });
    },

    onSettled: () => {
      invalidateKeys.forEach((key) => queryClient.invalidateQueries(key));
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
