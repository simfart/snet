import { getUserFn } from 'entities/user/api/userApi';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';

export const useUser = (userId: string) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery([QUERY_KEY.user, userId], () => getUserFn(userId));
  return useMemo(() => ({ user, isLoading, error }), [user, isLoading, error]);
};
