import { Navigate } from 'react-router-dom';
import { FC } from 'react';
import { useToken } from 'pages/auth/ui/hooks/useToken';
import { Loader } from './loader/Loader';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useToken();

  if (isLoading) return <Loader />;

  return isAuthenticated ? children : <Navigate to="/login" />;
};
