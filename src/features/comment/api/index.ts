import { api } from 'shared/api';
import { IComment } from '../model';

export const createCommentFn = async (postId: string, text: string) => {
  const userId = localStorage.getItem('ownerId');
  if (!userId) {
    throw new Error('User is not logged in');
  }

  const commentData = {
    text,
    post: {
      ___class: 'Posts',
      objectId: postId,
    },
    user: {
      ___class: 'Users',
      objectId: userId,
    },
  };

  try {
    const response = await api.put('/data/Comments/deep-save', commentData);
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

export const getCommentsForPostFn = async (postId: string) => {
  try {
    const response = await api.get(
      `/data/Comments?where=post.objectId%3D'${postId}'&loadRelations=user`,
    );
    return response.data;
  } catch (error) {
    console.error('Error getting comments:', error);
  }
};
