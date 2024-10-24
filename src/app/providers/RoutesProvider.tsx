import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from 'shared/ui';
import { LoginPage, RegisterPage } from 'pages/auth';
import { ProfilePage } from 'pages/profilePage';
import { PostPage } from 'pages/postPage';
import { ProtectedRoute } from 'features/protectedRoute';
import { HomePage } from 'pages/homePage';

export const RoutesProvider: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute children={<HomePage />} />} />
      <Route path="/profile/:objectId" element={<ProfilePage />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
