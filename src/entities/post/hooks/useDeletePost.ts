import { useMemo } from 'react';
import { deletePostFn } from 'entities/post/api/postApi';
import { useMutation, useQueryClient } from 'react-query';
import { IPost } from '../model/PostModel';

interface DeletePostContext {
  previousData?: IPost[][];
}

export const useDeletePost = (invalidateKeys: (string | string[])[]) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePostFn,

    onMutate: async (postId: string) => {
      // Отменяем все запросы для ключей, переданных в invalidateKeys
      await Promise.all(
        invalidateKeys.map((key) => queryClient.cancelQueries(key)),
      );

      // Сохраняем данные для каждого ключа
      const previousData = invalidateKeys.map(
        (key) => queryClient.getQueryData<IPost[]>(key) || [],
      );

      // Обновляем кэш данных для каждого ключа, убирая удаленный пост
      invalidateKeys.forEach((key, index) => {
        queryClient.setQueryData<IPost[]>(key, (oldPosts = []) =>
          oldPosts.filter((post) => post.objectId !== postId),
        );
      });

      return { previousData } as DeletePostContext;
    },

    onSuccess: () => {
      // Инвалидируем кэш для каждого ключа, чтобы подтянуть актуальные данные
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries(key);
      });
    },

    onError: (error, postId, context) => {
      const ctx = context as DeletePostContext;

      if (ctx?.previousData) {
        // Откат изменений для каждого ключа в случае ошибки
        ctx.previousData.forEach((previous, index) => {
          queryClient.setQueryData(invalidateKeys[index], previous);
        });
      }

      console.error('Error deleting post:', error);
    },

    onSettled: () => {
      // Инвалидируем кэш после завершения
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries(key);
      });
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
