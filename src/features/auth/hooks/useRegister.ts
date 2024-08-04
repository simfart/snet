import { registerUserFn } from 'entities/user/api/userApi';
import { useMemo } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationKey: [],
    mutationFn: registerUserFn,
    onSuccess: () => {
      navigate('/login', { replace: true });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return useMemo(() => ({ mutate, isLoading }), [mutate, isLoading]);
};
