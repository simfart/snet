import { FC } from 'react';
import { Posts } from 'widgets/posts';

import './PostPage.module.scss';

export const PostPage: FC = () => {
  return (
    <div className="container">
      <h1>Posts</h1>
      <Posts />
    </div>
  );
};
