import { api } from 'shared/api';

const getTagByName = async (tagName: string) => {
  try {
    const response = await api.get(`/data/tags?where=name%3D'${tagName}'`);
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error('Error fetching tag:', error);
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
    console.error('Error creating tag:', error);
    throw error;
  }
};

export const linkTagsToPost = async (postId: string, tagIds: string[]) => {
  try {
    const response = await api.post(`/data/posts/${postId}/tags`, tagIds);
    console.log('Tags linked to post:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error linking tags to post:', error);
  }
};

export const getPostsByTag = async (tagId: string) => {
  try {
    const response = await api.get(
      `/data/posts?where=tags.objectId%3D'${tagId}'`,
    );
    console.log('Posts with tag:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts by tag:', error);
  }
};

export const getAllTags = async () => {
  try {
    const response = await api.get('/data/tags');
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
  }
};
