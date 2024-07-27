import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { verifyTokenFn } from 'shared/api/auth/authApi';
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
