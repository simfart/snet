import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { getUserFn } from 'shared/api/auth/authApi';
import { QUERY_KEY } from 'shared/constants/queryKeys';

export const useUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: [QUERY_KEY.user],
    queryFn: getUserFn,
  });

  return useMemo(() => ({ user, isLoading }), [user, isLoading]);
};
