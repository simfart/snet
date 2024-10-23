import { api } from 'shared/api';

export const createCommentFn = async (postId: string, comment: string) => {
  const userId = localStorage.getItem('ownerId');
  if (!userId) {
    throw new Error('User is not logged in');
  }

  const commentData = {
    text: comment,
    ownerId: userId,
  };

  try {
    const createCommentResponse = await api.post(`/data/Comments`, commentData);
    const savedComment = createCommentResponse.data;

    if (!savedComment.objectId) {
      throw new Error('Failed to save comment');
    }
    await api.post(`/data/Comments/${savedComment.objectId}/user`, [userId]);
    await api.put(`/data/Posts/${postId}/comments`, [savedComment.objectId]);

    return savedComment;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

export const deleteCommentFn = async (commentId: string, postId: string) => {
  try {
    await api.delete(`/data/Comments/${commentId}`);

    await api.put(`/data/Posts/${postId}`, {
      comments: {
        __op: 'RemoveRelation',
        objectIds: [commentId],
      },
    });

    return { success: true, commentId };
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
