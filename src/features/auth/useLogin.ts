import { loginUserFn } from 'entities/user/api/userApi';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from 'shared/constants/queryKeys';

export const useLogin = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationKey: [],
    mutationFn: loginUserFn,
    onSuccess: (data) => {
      window.localStorage.setItem('token', data['user-token']);
      window.localStorage.setItem('ownerId', data.ownerId);

      queryClient.setQueryData([QUERY_KEY.user], data);
      queryClient.removeQueries([QUERY_KEY.accessToken], { inactive: true });

      navigate('/', { replace: true });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return useMemo(() => ({ mutate, isLoading }), [mutate, isLoading]);
};
