import { FC } from 'react';

import { CreatePostForm } from 'features/сreatePostForm';
import { Post } from 'entities/post';
import { IPost } from 'entities/post/model/PostModel';
import { IUser } from 'entities/user/model/userModel';

import styles from './UserPosts.module.scss';

interface userPostsProps {
  posts: IPost[] | undefined;
  onTagClick: () => void;
  onPostClick: (post: string) => void;
  user: IUser;
}

export const UserPosts: FC<userPostsProps> = ({
  posts,
  user,
  onTagClick,
  onPostClick,
}) => (
  <div className={styles.profilePostContainer}>
    <h2 className={styles.titleCreate}>Create New Post</h2>
    <CreatePostForm user={user} variant="profilePage" />
    <div>
      <h2>My Posts</h2>
      {posts?.map((post: IPost) => (
        <Post
          key={post.objectId}
          post={post}
          onTagClick={onTagClick}
          onPostClick={onPostClick}
        />
      ))}
    </div>
  </div>
);
