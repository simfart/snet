import { verifyTokenFn } from 'entities/user/api/userApi';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { QUERY_KEY } from 'shared/constants/queryKeys';

export const useToken = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.accessToken],
    queryFn: verifyTokenFn,
    initialData: !!window.localStorage.getItem('token'),
  });

  return useMemo(
    () => ({ isAuthenticated: data, isLoading }),
    [data, isLoading],
  );
};
