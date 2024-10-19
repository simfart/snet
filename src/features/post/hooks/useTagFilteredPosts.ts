import { getPostsByTag } from 'entities/post/api/postApi';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';

export const useTagFilteredPosts = (selectedTagId: string | null) => {
  const {
    data: tagFilterPosts,
    isLoading: isTagFilterPostsLoading,
    error: tagfilterPostsError,
  } = useQuery(
    [QUERY_KEY.posts, selectedTagId],
    () => getPostsByTag(selectedTagId!),
    {
      enabled: !!selectedTagId,
    },
  );

  return useMemo(
    () => ({ tagFilterPosts, isTagFilterPostsLoading, tagfilterPostsError }),
    [tagFilterPosts, tagfilterPostsError, isTagFilterPostsLoading],
  );
};
