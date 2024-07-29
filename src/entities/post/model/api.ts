import { Post } from './types';
import { api } from 'shared/api/auth/api';

export const getPostFn = async (): Promise<Post[]> => {
  const response = await api.get(
    `/data/Posts?sortBy=created desc&loadRelations=user`,
  );
  return response.data;
};

interface PostArgs {
  description?: string;
  image?: string;
  obgectId?: string;
}

export const createPost = async ({ description, image }: PostArgs) => {
  const userId = localStorage.getItem('ownerId');
  if (!userId) {
    throw new Error('User is not logged in');
  }
  const postData = {
    description,
    image,
    user: [
      {
        ___class: 'Users',
        objectId: localStorage.getItem('ownerId'),
      },
    ],
  };
  const response = await api.put('/data/Posts/deep-save', postData, {
    headers: {
      isTokenNeed: true,
    },
  });
  return response.data;
};

export const deletePostFn = async (objectId: string) => {
  const response = await api.delete(`/data/Posts/${objectId}`, {
    headers: {
      isTokenNeed: true,
    },
  });
  return response.data;
};

export const likePostFn = async (objectId: string): Promise<void> => {
  const userId = [localStorage.getItem('ownerId')];
  if (!userId) {
    throw new Error('User is not logged in');
  }
  try {
    await api.put(`/data/Posts/${objectId}/likes`, userId),
      console.log('Post liked successfully');
  } catch (error) {
    console.error('Error liking post:', error);
  }
};
