import { FC } from 'react';

import { IPost } from 'entities/post/model/PostModel';

import styles from './Posts.module.scss';
import { Post } from 'entities/post';
import { CreatePostForm } from 'features/сreatePostForm/ui/CreatePostForm';

import { useCurrentUser } from 'features/auth/useCurrentUser';
import { QUERY_KEY } from 'shared/constants/queryKeys';

interface PostsProps {
  selectedTagId: string | null;
  searchTerm: string | null;
  onTagClick: (tagId: string, tagName: string) => void;
  onPostClick: (post: string) => void;
  posts?: IPost[];
}

export const Posts: FC<PostsProps> = ({ onTagClick, onPostClick, posts }) => {
  const { user } = useCurrentUser();

  return (
    <div className={styles.postsContainer}>
      <div className={styles.createPostFormWrapper}>
        <CreatePostForm user={user} invalidateKeys={[QUERY_KEY.posts]} />
      </div>
      <div className={styles.posts}>
        {posts?.map((post: IPost) => (
          <Post
            key={post.objectId}
            post={post}
            onTagClick={onTagClick}
            onPostClick={onPostClick}
            invalidateKeys={[QUERY_KEY.posts]}
          />
        ))}
      </div>
    </div>
  );
};
