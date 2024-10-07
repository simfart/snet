import { api } from 'shared/api';

export const registerUserFn = async (user: {
  name: string;
  email: string;
  password: string;
  about: string;
  avatar: string;
}) => {
  const response = await api.post('/users/register', user);
  return response.data;
};

export const verifyTokenFn = async () => {
  const token = localStorage.getItem('token');

  return await api
    .get<boolean>(`/users/isvalidusertoken/${token}`)
    .then((res) => res.data);
};

export const loginUserFn = async (user: {
  login: string;
  password: string;
}) => {
  const response = await api.post('/users/login', user);
  return response.data;
};

export const uptateUserFn = async (user: { email?: string; name?: string }) => {
  const userId = localStorage.getItem('ownerId');
  const response = await api.put(`/users/${userId}`, user, {
    headers: {
      isTokenNeed: true,
    },
  });
  return response.data;
};

export const logoutUserFn = async () => {
  const response = await api.get('/users/logout', {
    headers: {
      isTokenNeed: true,
    },
  });
  return response.data;
};

export const getCurrentUserFn = async () => {
  const ownerId = localStorage.getItem('ownerId');
  const response = await api.get(`/data/Users/${ownerId}`, {
    headers: {
      isTokenNeed: true,
    },
  });

  return response.data;
};

export const getUserFn = async (userId: string) => {
  const response = await api.get(`/data/Users/${userId}`, {
    headers: {
      isTokenNeed: true,
    },
  });

  return response.data;
};
