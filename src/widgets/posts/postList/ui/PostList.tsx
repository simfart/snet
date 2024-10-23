import { FC } from 'react';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { PostCard } from 'widgets/posts/postCard';
import { useCurrentUser } from 'entities/user/hooks';
import { IPost } from 'entities/post/model/PostModel';
import { CreatePostForm } from 'features/сreatePostForm';
import styles from './PostList.module.scss';

interface PostsProps {
  selectedTagId: string | null;
  searchTerm: string | null;
  onTagClick: (tagId: string, tagName: string) => void;
  onPostClick: (post: string) => void;
  posts?: IPost[];
}

export const PostList: FC<PostsProps> = ({
  onTagClick,
  onPostClick,
  posts,
}) => {
  const { user } = useCurrentUser();

  return (
    <div className={styles.postsContainer}>
      <div className={styles.createPostFormWrapper}>
        <CreatePostForm user={user} invalidateKeys={[QUERY_KEY.posts]} />
      </div>
      <div className={styles.posts}>
        {posts?.map((post: IPost) => (
          <PostCard
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
