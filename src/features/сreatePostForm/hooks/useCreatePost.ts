import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { useMemo } from 'react';
import { createPost } from 'entities/post/api/postApi';
import { createTag, linkTagsToPost } from 'entities/tag/api/tagsApi';

export const useCreatePost = () => {
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
          console.error('Error creating or fetching tag:', error);
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
    },
    onError: (err) => {
      console.error('Error creating post:', err);
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
