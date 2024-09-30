import { api } from 'shared/api';
import { IComment } from '../model';

// export const createCommentFn = async (postId: string, text: string) => {
//   const userId = localStorage.getItem('ownerId');
//   if (!userId) {
//     throw new Error('User is not logged in');
//   }

//   const commentData = {
//     text,
//     post: {
//       ___class: 'Posts',
//       objectId: postId,
//     },
//     user: {
//       ___class: 'Users',
//       objectId: userId,
//     },
//   };

//   try {
//     const response = await api.put('/data/Comments/deep-save', commentData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating comment:', error);
//     throw error;
//   }
// };

// export const getCommentsForPostFn = async (postId: string) => {
//   try {
//     const response = await api.get(
//       `/data/Comments?where=post.objectId%3D'${postId}'&loadRelations=user`,
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error getting comments:', error);
//   }
// };

// export const createCommentFn = async (postId: string, text: string) => {
//   const userId = localStorage.getItem('ownerId');
//   if (!userId) {
//     throw new Error('User is not logged in');
//   }

//   const commentData = {
//     text,
//     post: {
//       ___class: 'Posts',
//       objectId: postId,
//     },
//     user: {
//       ___class: 'Users',
//       objectId: userId,
//     },
//   };

//   try {
//     const response = await api.put('/data/Comments/deep-save', commentData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating comment:', error);
//     throw error;
//   }
// };

export const createCommentFn = async (postId: string, text: string) => {
  const userId = localStorage.getItem('ownerId');
  if (!userId) {
    throw new Error('User is not logged in');
  }

  const commentData = {
    text: text,
    post: {
      ___class: 'Posts', // Укажите класс, к которому будет привязан комментарий
      objectId: postId, // Укажите objectId поста
    },
    user: {
      ___class: 'Users', // Укажите класс пользователя
      objectId: userId, // Укажите objectId пользователя
    },
  };

  try {
    // Шаг 1: Создание комментария
    const createCommentResponse = await api.put(
      `/data/Comments/deep-save`,
      commentData,
    );

    const commentId = createCommentResponse.data.objectId;

    // Шаг 2: Обновление поста
    await api.put(`/data/Posts/${postId}`, {
      comments: { relation: { objectId: commentId } }, // Добавляем созданный комментарий
    });

    console.log('Комментарий успешно добавлен к посту!');
    return createCommentResponse.data; // Возвращаем данные комментария
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error; // Бросаем ошибку для дальнейшей обработки
  }
};
