import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { useMemo } from 'react';
import { createPost } from 'entities/post/api/postApi';
import { createTag, linkTagsToPost } from 'entities/tag/api/tagsApi';
import { IPost } from 'entities/post/model/PostModel';
import { useUser } from 'features/auth/useUser';

interface CreatePostContext {
  previousPosts?: IPost[];
  previousUserPosts?: IPost[];
}

export const useCreatePost = () => {
  const currentUser = useUser().user;

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
    onMutate: async ({ description, image, tags }) => {
      await queryClient.cancelQueries([QUERY_KEY.posts]);
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

      const newPost: IPost = {
        objectId: `temp-${Date.now()}`,
        description,
        image,
        created: Date.now(),
        user: currentUser,
        comments: [],
        likes: [],
        tags: tags.map((tag) => ({ name: tag, objectId: `temp-${tag}` })),
      };

      queryClient.setQueryData<IPost[]>([QUERY_KEY.posts], (oldPosts) => {
        return oldPosts ? [newPost, ...oldPosts] : [newPost];
      });
      queryClient.setQueryData<IPost[]>(
        [QUERY_KEY.userPosts, currentUser.objectId],
        (oldPosts) => {
          return oldPosts ? [newPost, ...oldPosts] : [newPost];
        },
      );

      return { previousPosts, previousUserPosts } as CreatePostContext;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.tags]);
      queryClient.invalidateQueries([QUERY_KEY.posts]);
      queryClient.invalidateQueries([
        QUERY_KEY.userPosts,
        currentUser.objectId,
      ]);
    },
    onError: (error, _, context) => {
      const ctx = context as CreatePostContext;

      if (ctx.previousPosts) {
        queryClient.setQueryData([QUERY_KEY.posts], ctx.previousPosts);
      }
      if (ctx.previousUserPosts) {
        queryClient.setQueryData(
          [QUERY_KEY.userPosts, currentUser.objectId],
          ctx.previousUserPosts,
        );
      }

      console.error(error);
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
