import { FC } from 'react';

import './PostPage.module.scss';
import { CreatePostForm } from 'widgets/posts/CreatePostForm/ui/CreatePostForm';
import { PostList } from 'widgets/posts/PostList';

export const PostPage: FC = () => {
  return (
    <div className="container">
      <h1>Posts</h1>
      <CreatePostForm />
      <PostList />
    </div>
  );
};
