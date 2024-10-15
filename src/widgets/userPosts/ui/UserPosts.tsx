import { FC } from 'react';

import { CreatePostForm } from 'features/сreatePostForm';
import { Post } from 'entities/post';
import { IPost } from 'entities/post/model/PostModel';
import { IUser } from 'entities/user/model/userModel';

import styles from './UserPosts.module.scss';
import { nothingPic } from 'shared/assets/images';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { useCurrentUser } from 'features/auth/useCurrentUser';

interface userPostsProps {
  posts: IPost[] | undefined;
  onTagClick: (tagId: string, tagName: string) => void;
  onPostClick: (post: string) => void;
  user: IUser;
  isOwner?: boolean;
}

export const UserPosts: FC<userPostsProps> = ({
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
            <Post
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
