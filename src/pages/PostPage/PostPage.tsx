import { FC } from 'react';
import { PostList } from 'features/post/ui/PostList';
import { CreatePostForm } from 'features/post/model/CreatePostForm';

export const PostPage: FC = () => {
  return (
    <div className="container">
      <h1>Posts</h1>
      <CreatePostForm />
      <PostList />
    </div>
  );
};
