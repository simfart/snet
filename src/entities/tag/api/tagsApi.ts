import { api } from 'shared/api';

const getTagByName = async (tagName: string) => {
  try {
    const response = await api.get(`/data/tags?where=name%3D'${tagName}'`);
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createTag = async (tagName: string) => {
  const existingTag = await getTagByName(tagName);

  if (existingTag) {
    return existingTag;
  }

  try {
    const response = await api.post('/data/tags', { name: tagName });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const linkTagsToPost = async (postId: string, tagIds: string[]) => {
  try {
    const response = await api.post(`/data/posts/${postId}/tags`, tagIds);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPostsByTag = async (tagId: string) => {
  try {
    const response = await api.get(
      `/data/posts?where=tags.objectId%3D'${tagId}'&loadRelations=user,likes,tags`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllTags = async () => {
  try {
    const response = await api.get('/data/tags');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
