import { getPostsByTag } from 'entities/post/api/postApi';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';

export const useTagFilteredPosts = (selectedTagId: string | null) => {
  const {
    data: filteredPosts,
    isLoading: isFilteredPostsLoading,
    error: filteredPostsError,
  } = useQuery(
    [QUERY_KEY.filteredPosts, selectedTagId],
    () => getPostsByTag(selectedTagId!),
    {
      enabled: !!selectedTagId,
    },
  );

  return useMemo(
    () => ({ filteredPosts, isFilteredPostsLoading, filteredPostsError }),
    [filteredPosts, filteredPostsError, isFilteredPostsLoading],
  );
};
