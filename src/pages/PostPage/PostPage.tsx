import { FC } from 'react';
import { PostList } from 'features/post/ui/PostList';
import { CreatePostForm } from 'features/post/ui/CreatePostForm';
import styles from './HomePage.module.css';

export const PostPage: FC = () => {
  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      <CreatePostForm />
      <PostList />
    </div>
  );
};
