import { Route, Routes } from 'react-router-dom';
import { RegisterPage, LoginPage } from 'pages/auth';
import { FC } from 'react';
import { HomePage } from 'pages/home';
import { PageNotFound, ProtectedRoute } from 'shared/ui';
import { UpdatePage } from 'features/update-user';
import { Profile } from 'pages/profile/Profile';

export const RoutesProvider: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute children={<HomePage />} />} />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="/update"
        element={<ProtectedRoute children={<UpdatePage />} />}
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
