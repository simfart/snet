import { Navigate } from 'react-router-dom';
import { FC } from 'react';
import { useToken } from 'features/auth/hooks/useToken';
import { Loader } from '../../shared/ui/loader/Loader';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useToken();

  if (isLoading) return <Loader />;

  return isAuthenticated ? children : <Navigate to="/login" />;
};
