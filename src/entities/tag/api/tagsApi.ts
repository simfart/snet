import { IPost } from 'entities/post/model/PostModel';
import { api } from 'shared/api';

const updatePostTags = async (postId: string, tags: string[]) => {
  try {
    const tagsString = tags.join(', '); // Преобразуем массив тегов в строку
    await api.patch(
      `/data/posts/${postId}`,
      { tags: tagsString },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('Post updated with new tags successfully');
  } catch (error) {
    console.error('Error updating post tags:', error);
  }
};

const searchPostsByTag = async (tag: string) => {
  try {
    const response = await api.get(`/data/posts`, {
      params: {
        where: `tags LIKE '%${tag}%'`,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching posts by tag:', error);
  }
};

const getAllTags = async () => {
  try {
    const response = await api.get(`/data/posts`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const posts = response.data;

    // Собираем уникальные теги
    const tagsSet = new Set<string>();
    posts.forEach((post: IPost) => {
      if (post.tags) {
        post.tags.split(', ').forEach((tag: string) => tagsSet.add(tag));
      }
    });

    return Array.from(tagsSet);
  } catch (error) {
    console.error('Error getting all tags:', error);
  }
};
