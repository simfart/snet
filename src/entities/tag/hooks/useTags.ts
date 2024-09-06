import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { getAllTags } from '../api/tagsApi';

export const useTags = () => {
  const {
    data: tags,
    isLoading,
    error,
    isFetching,
  } = useQuery(QUERY_KEY.tags, getAllTags);

  return useMemo(
    () => ({ tags, isLoading, error, isFetching }),
    [error, isFetching, isLoading, tags],
  );
};
