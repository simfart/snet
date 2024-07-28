import { useEffect, useState } from 'react';
import { fetchComments } from 'entities/Comment/model/api';

export const useComments = (postId) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments(postId).then((data) => setComments(data));
  }, [postId]);

  return { comments };
};
