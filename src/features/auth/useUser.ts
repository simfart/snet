import { getUserFn } from 'entities/user/api/userApi';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';

export const useUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: [QUERY_KEY.user],
    queryFn: getUserFn,
  });
  return useMemo(() => ({ user, isLoading }), [user, isLoading]);
};
