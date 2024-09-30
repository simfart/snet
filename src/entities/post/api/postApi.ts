import { api } from 'shared/api';
import { IPost } from '../model/PostModel';

interface PostArgs {
  description?: string;
  image?: string;
  obgectId?: string;
  likes?: Like[];
  tags?: string[];
}

interface Like {
  objectId: string;
  postId: string;
  userId: string;
}

// export const getPostsFn = async (): Promise<IPost[]> => {
//   const response = await api.get(
//     `/data/Posts?sortBy=created desc&loadRelations=user,likes,tags&pageSize=100`,
//   );
//   return response.data;
// };

export const getPostsFn = async (): Promise<IPost[]> => {
  const response = await api.get(
    `/data/Posts?sortBy=created desc&loadRelations=user,likes,tags&pageSize=100&props=*,count(comments)`,
  );
  return response.data;
};

export const getUserPostsFn = async (userId: string): Promise<IPost[]> => {
  const response = await api.get(
    `/data/Posts?where=ownerId%3D'${encodeURIComponent(
      userId,
    )}'&loadRelations=user,likes,tags&sortBy=created desc&pageSize=100`,
  );
  return response.data;
};

export const searchPosts = async (searchTerm: string) => {
  try {
    const encodedSearchTerm = encodeURIComponent(`%${searchTerm}%`);
    const response = await api.get(
      `/data/posts?where=description%20LIKE%20'${encodedSearchTerm}'&loadRelations=user,likes,tags&sortBy=created%20DESC
`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPostsByTag = async (tagId: string) => {
  try {
    const response = await api.get(
      `/data/posts?where=tags.objectId%3D'${tagId}'&loadRelations=user,likes,tags&sortBy=created%20desc`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createPost = async ({ description, image }: PostArgs) => {
  const userId = localStorage.getItem('ownerId');
  if (!userId) {
    throw new Error('User is not logged in');
  }
  const postData = {
    description,
    image,
    user: {
      ___class: 'Users',
      objectId: localStorage.getItem('ownerId'),
    },
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
  await api.put(`/data/Posts/${objectId}/likes`, userId);
};

export const removeLikePostFn = async (objectId: string) => {
  const userId = [localStorage.getItem('ownerId')];
  if (!userId) {
    throw new Error('User is not logged in');
  }
  await api.delete(`/data/Posts/${objectId}/likes`, {
    data: userId,
  });
};

export const getPostFn = async (postId: string) => {
  try {
    const response = await api.get(`/data/Posts/${postId}`, {
      params: {
        loadRelations: 'comments,comments.user,user,likes,comments,tags',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting post:', error);
  }
};

export const getCommentsCountForPost = async (postId: string) => {
  try {
    const response = await api.get(
      `/data/Comments?where=post.objectId%3D'${postId}'&property=count(*) as totalCount`,
    );
    return response.data[0].totalCount;
  } catch (error) {
    console.error('Error getting comments count:', error);
  }
};
