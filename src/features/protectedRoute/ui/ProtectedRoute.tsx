import { Navigate } from 'react-router-dom';
import { FC } from 'react';
import { useToken } from 'features/auth/useToken';
import { Loader } from 'shared/ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useToken();

  if (isLoading) return <Loader />;

  return isAuthenticated ? children : <Navigate to="/login" />;
};
