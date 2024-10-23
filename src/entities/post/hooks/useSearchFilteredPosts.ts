import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { searchPostsFn } from '../api';

export const useSearchFilteredPosts = (searchTerm: string | null) => {
  const {
    data: foundPosts,
    isLoading: isfoundPostsLoading,
    error: foundPostsError,
  } = useQuery(
    [QUERY_KEY.posts, searchTerm],
    () => searchPostsFn(searchTerm!),
    {
      enabled: !!searchTerm,
    },
  );

  return useMemo(
    () => ({ foundPosts, isfoundPostsLoading, foundPostsError }),
    [foundPosts, foundPostsError, isfoundPostsLoading],
  );
};
