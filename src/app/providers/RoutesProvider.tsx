import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from 'shared/ui';
import { LoginPage, RegisterPage } from 'pages/auth';
import { HomePage } from 'pages/homePage';
import { ProfilePage } from 'pages/profilePage';
import { PostPage } from 'pages/postPage';
import { ProtectedRoute } from 'features/protectedRoute';

export const RoutesProvider: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute children={<HomePage />} />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/posts" element={<PostPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
