import { logoutUserFn } from 'entities/user/api/userApi';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(logoutUserFn, {
    onSuccess: () => {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('ownerId');
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return useMemo(() => ({ mutate, isLoading }), [mutate, isLoading]);
};
