import axios from 'axios';
import { Post } from './types';
import { api } from 'shared/api/auth/api';

// Функция для получения постов
export const fetchPosts = async (): Promise<Post[]> => {
  const response = await api.get('/data/Posts');
  return response.data;
};

// Функция для создания нового поста
export const createPost = async (newPost: Omit<Post, 'id'>): Promise<Post> => {
  const response = await api.post('/data/Posts', newPost);
  return response.data;
};

export const getPostWithUser = async () => {
  const response = await api.get(`/data/Posts?loadRelations=user`);
  return response.data;
};

// export const createPost = async (description: string, userId: string) => {
//   const postData = {
//     description,
//     user: {
//       "__op": "AddRelation",
//       "objectId": userId
//     }
//   };
//   const response = await axios.post(`${BASE_URL}/Posts`, postData);
//   return response.data;
// };
