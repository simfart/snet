import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from 'pages/HomePage';
import { PageNotFound } from 'shared/ui';
import { Profile } from 'pages/ProfilePage';
import { PostPage } from 'pages/PostPage';
import { RegisterPage } from 'pages/auth/RegisterPage';
import { LoginPage } from 'pages/auth/LoginPage';
import { UpdateUserForm } from 'features/user';
import { ProtectedRoute } from 'features/protectedRoute/ProtectedRoute';
import { Form } from 'features/auth/AuthForm/Form';

export const RoutesProvider: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute children={<HomePage />} />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/posts" element={<PostPage />} />
      <Route
        path="/update"
        element={<ProtectedRoute children={<UpdateUserForm />} />}
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/form" element={<Form />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
