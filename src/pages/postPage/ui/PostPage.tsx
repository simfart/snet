import { FC } from 'react';

import './PostPage.module.scss';
import { CreatePostForm } from 'features/сreatePostForm';
import { Posts } from 'widgets/posts';

export const PostPage: FC = () => {
  return (
    <div className="container">
      <h1>Posts</h1>
      <CreatePostForm />
      <Posts />
    </div>
  );
};
