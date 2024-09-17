import { searchPosts } from 'entities/post/api/postApi';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';

export const useSearchFilteredPosts = (searchTerm: string | null) => {
  const {
    data: foundPosts,
    isLoading: isfoundPostsLoading,
    error: foundPostsError,
  } = useQuery([QUERY_KEY.posts, searchTerm], () => searchPosts(searchTerm!), {
    enabled: !!searchTerm,
  });

  return useMemo(
    () => ({ foundPosts, isfoundPostsLoading, foundPostsError }),
    [foundPosts, foundPostsError, isfoundPostsLoading],
  );
};
