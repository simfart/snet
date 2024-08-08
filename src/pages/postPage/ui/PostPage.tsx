import { FC } from 'react';

import './PostPage.module.scss';
import { CreatePostForm } from 'widgets/сreatePostForm';
import { PostList } from 'widgets/postList';

export const PostPage: FC = () => {
  return (
    <div className="container">
      <h1>Posts</h1>
      <CreatePostForm />
      <PostList />
    </div>
  );
};
