import { FC } from 'react';
import { CreatePostForm } from 'features/сreatePostForm';
import { PostCard } from 'widgets/posts/postCard';
import { IPost } from 'entities/post/model/PostModel';
import { IUser } from 'entities/user/model/userModel';
import { useCurrentUser } from 'entities/user/hooks';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { nothingPic } from 'shared/assets/images';
import styles from './UserPostList.module.scss';

interface userPostsProps {
  posts: IPost[] | undefined;
  onTagClick: (tagId: string, tagName: string) => void;
  onPostClick: (post: string) => void;
  user: IUser;
  isOwner?: boolean;
}

export const UserPostList: FC<userPostsProps> = ({
  posts,
  user,
  onTagClick,
  onPostClick,
  isOwner,
}) => {
  const currentUser = useCurrentUser().user;
  return (
    <div className={styles.profilePostContainer}>
      {isOwner && (
        <>
          <h2 className={styles.titleCreate}>Create New Post</h2>
          <CreatePostForm
            user={user}
            variant="profilePage"
            invalidateKeys={[[QUERY_KEY.userPosts, currentUser?.objectId]]}
          />{' '}
        </>
      )}
      <div>
        <h2>{isOwner ? 'My Posts' : 'Posts'}</h2>
        {posts && posts.length > 0 ? (
          posts.map((post: IPost) => (
            <PostCard
              key={post.objectId}
              post={post}
              onTagClick={onTagClick}
              onPostClick={onPostClick}
              variant="profilePage"
              invalidateKeys={[[QUERY_KEY.userPosts, currentUser?.objectId]]}
            />
          ))
        ) : (
          <img
            className={styles.image}
            src={nothingPic}
            alt="No posts available"
          />
        )}
      </div>
    </div>
  );
};
