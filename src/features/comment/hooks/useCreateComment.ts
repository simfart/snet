import { useMutation, useQueryClient } from 'react-query';
import { createCommentFn } from '../api';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { useMemo } from 'react';
import { IPost } from 'entities/post/model/PostModel';
import { useUser } from 'features/auth/useUser';
import { IComment } from '../model';
import { useCurrentUser } from 'features/auth';

interface CreateCommentInput {
  postId: string;
  text: string;
}

// interface CreateCommentContext {
//   previousPosts?: IPost[];
//   previousPost?: IPost;
//   previousUserPosts?: IPost[];
// }

// export const useCreateComment = (
//   post: IPost,
//   setPostData: (data: IPost) => void,
// ) => {
//   const queryClient = useQueryClient();
//   const currentUser = useUser().user;

//   const mutation = useMutation({
//     mutationFn: async ({ postId, text }: CreateCommentInput) => {
//       const newComment = await createCommentFn(postId, text);
//       return newComment;
//     },
//     onMutate: async ({ text }) => {
//       await queryClient.cancelQueries([QUERY_KEY.posts]);
//       await queryClient.cancelQueries([QUERY_KEY.post, post.objectId]);
//       await queryClient.cancelQueries([
//         QUERY_KEY.userPosts,
//         currentUser.objectId,
//       ]);
//       const previousUserPosts = queryClient.getQueryData<IPost[]>([
//         QUERY_KEY.userPosts,
//         currentUser.objectId,
//       ]);
//       const previousPosts = queryClient.getQueryData<IPost[]>([
//         QUERY_KEY.posts,
//       ]);
//       const previousPost = queryClient.getQueryData<IPost>([
//         QUERY_KEY.post,
//         post.objectId,
//       ]);

//       const newComment: IComment = {
//         objectId: `temp-${Date.now()}`,
//         text,
//         user: currentUser,
//         created: Date.now(),
//       };

//       setPostData({
//         ...post,
//         comments: [...post.comments, newComment],
//       });

//       queryClient.setQueryData<IPost[]>([QUERY_KEY.posts], (oldPosts) => {
//         if (!oldPosts) return [];
//         return oldPosts.map((oldPost) =>
//           oldPost.objectId === post.objectId
//             ? { ...oldPost, comments: [...oldPost.comments, newComment] }
//             : oldPost,
//         );
//       });
//       queryClient.setQueryData<IPost[]>(
//         [QUERY_KEY.userPosts, currentUser.objectId],
//         (oldPosts) => {
//           if (!oldPosts) return [];
//           return oldPosts.map((oldPost) =>
//             oldPost.objectId === post.objectId
//               ? { ...oldPost, comments: [...oldPost.comments, newComment] }
//               : oldPost,
//           );
//         },
//       );

//       return {
//         previousPosts,
//         previousPost,
//         previousUserPosts,
//       } as CreateCommentContext;
//     },
//     onError: (error) => {

//       console.error(error);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries([QUERY_KEY.posts]);
//       queryClient.invalidateQueries([QUERY_KEY.post, post.objectId]);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries([QUERY_KEY.posts]);
//       queryClient.invalidateQueries([QUERY_KEY.post, post.objectId]);
//     },
//   });

//   return useMemo(
//     () => ({ mutate: mutation.mutate, isLoading: mutation.isLoading }),
//     [mutation.isLoading, mutation.mutate],
//   );
// };

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser().user;
  const mutation = useMutation({
    mutationFn: async ({ postId, text }: CreateCommentInput) => {
      const newComment = await createCommentFn(postId, text);
      return newComment;
    },
    onSettled: () => {
      queryClient.refetchQueries([QUERY_KEY.posts]);
      queryClient.refetchQueries([QUERY_KEY.userPosts, currentUser.objectId]);
    },
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY.post]);
      queryClient.invalidateQueries([QUERY_KEY.posts]);
      queryClient.invalidateQueries([QUERY_KEY.comments]);
      queryClient.invalidateQueries([
        QUERY_KEY.userPosts,
        currentUser.objectId,
      ]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return useMemo(
    () => ({ mutate: mutation.mutate, isLoading: mutation.isLoading }),
    [mutation.isLoading, mutation.mutate],
  );
};
