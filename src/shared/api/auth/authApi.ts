import axios from 'axios';
import { GenericResponse, ILoginResponse, IUserResponse } from './types';
import { backendBaseUrl } from 'shared/config';

const BASE_URL = backendBaseUrl;

export const authApi = axios.create({
  baseURL: BASE_URL,
});

authApi.interceptors.request.use(
  async (config) => {
    if (config.headers.isTokenNeed) {
      const token = localStorage.getItem('token');
      config.headers['user-token'] = `${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export const registerUserFn = async (user: {
  name: string;
  email: string;
  password: string;
  about: string;
  avatar: string;
}) => {
  const response = await authApi.post<GenericResponse>('/users/register', user);
  return response.data;
};

export const verifyTokenFn = async () => {
  const token = localStorage.getItem('token');

  return await authApi
    .get<boolean>(`/users/isvalidusertoken/${token}`)
    .then((res) => res.data);
};

export const loginUserFn = async (user: {
  login: string;
  password: string;
}) => {
  const response = await authApi.post<ILoginResponse>('/users/login', user);
  return response.data;
};

export const uptateUserFn = async (user: { email?: string; name?: string }) => {
  const userId = localStorage.getItem('ownerId');
  const response = await authApi.put<ILoginResponse>(`/users/${userId}`, user, {
    headers: {
      isTokenNeed: true,
    },
  });
  return response.data;
};

export const logoutUserFn = async () => {
  const response = await authApi.get('/users/logout', {
    headers: {
      isTokenNeed: true,
    },
  });
  return response.data;
};

export const getUserFn = async () => {
  const ownerId = localStorage.getItem('ownerId');
  const response = await authApi.get<IUserResponse>(`/data/Users/${ownerId}`, {
    headers: {
      isTokenNeed: true,
    },
  });

  return response.data;
};
