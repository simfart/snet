import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { getPostsByTagFn } from '../api';

export const useTagFilteredPosts = (selectedTagId: string | null) => {
  const {
    data: tagFilterPosts,
    isLoading: isTagFilterPostsLoading,
    error: tagfilterPostsError,
  } = useQuery(
    [QUERY_KEY.posts, selectedTagId],
    () => getPostsByTagFn(selectedTagId!),
    {
      enabled: !!selectedTagId,
    },
  );

  return useMemo(
    () => ({ tagFilterPosts, isTagFilterPostsLoading, tagfilterPostsError }),
    [tagFilterPosts, tagfilterPostsError, isTagFilterPostsLoading],
  );
};
