import { uptateUserFn } from 'entities/user/api/userApi';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY } from 'shared/constants/queryKeys';

export const useEditUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationKey: ['mutateUser'],
    mutationFn: uptateUserFn,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.currentUser]);
      navigate('/', { replace: true });
    },
  });
  return useMemo(() => ({ mutate, isLoading }), [mutate, isLoading]);
};
