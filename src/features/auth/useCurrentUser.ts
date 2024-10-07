import { getCurrentUserFn } from 'entities/user/api/userApi';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';

export const useCurrentUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: [QUERY_KEY.currentUser],
    queryFn: getCurrentUserFn,
  });
  return useMemo(() => ({ user, isLoading }), [user, isLoading]);
};
