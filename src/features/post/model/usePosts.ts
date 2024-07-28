import { useEffect, useState } from 'react';
import { fetchPosts } from 'entities/Post/model/api';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then((data) => setPosts(data));
  }, []);

  return { posts };
};
