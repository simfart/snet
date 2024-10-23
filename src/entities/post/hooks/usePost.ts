import { useQuery } from 'react-query';
import { useMemo, useState } from 'react';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { IPost } from '../model/PostModel';
import { getPostFn } from '../api';

export const usePost = (postId: string) => {
  const [postData, setPostData] = useState<IPost | null>(null);
  const {
    data: postFromServer,
    isLoading,
    error,
  } = useQuery([QUERY_KEY.post, postId], () => getPostFn(postId), {
    onSuccess: (data) => {
      setPostData(data);
    },
  });

  const post = postData || postFromServer;

  return useMemo(
    () => ({ post, isLoading, error, setPostData }),
    [post, error, isLoading],
  );
};
