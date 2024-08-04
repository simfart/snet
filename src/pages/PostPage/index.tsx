import { FC } from 'react';

import './PostPage.module.scss';
import { CreatePostForm } from 'features/post/CreatePostForm/CreatePostForm';
import { PostList } from 'widgets/PostList';

export const PostPage: FC = () => {
  return (
    <div className="container">
      <h1>Posts</h1>
      <CreatePostForm />
      <PostList />
    </div>
  );
};
