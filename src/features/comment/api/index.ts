import { api } from 'shared/api';
import { IComment } from '../model';

// export const createCommentFn = async (comment: IComment) => {
//   console.log(comment);
//   try {
//     const response = await api.post('/data/Comments', {
//       user: { objectId: comment.user.objectId },
//       post: { objectId: comment.post.objectId },
//       content: comment.content,
//     });
//     return response.data;
//   } catch (error: any) {
//     if (error.response) {
//       console.error('Error response:', error.response.data);
//     } else if (error.request) {
//       console.error('Error request:', error.request);
//     } else {
//       console.error('General error:', error.message);
//     }
//   }
// };

export const createCommentFn = async (
  userId: string,
  postId: string,
  content: string,
) => {
  try {
    const response = await api.post('/data/Comments', {
      user: { objectId: userId }, // ID пользователя
      post: { objectId: postId }, // ID поста
      content: content, // Текст комментария
    });
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
  }
};
