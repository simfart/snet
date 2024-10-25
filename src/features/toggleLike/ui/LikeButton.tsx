import { FC, useCallback } from 'react';

import styles from './LikeButton.module.scss';
import { useToggleLikePost } from '../hooks/useToggleLikePost';
import { likePostFn, removeLikePostFn } from 'entities/post/api/postApi';
import { IPost } from 'entities/post/model/PostModel';
import { IUser } from 'entities/user/model/userModel';
import { heartIcon, heartOutlinedIcon } from 'shared/assets/images';

interface ILike {
  objectId: string;
}

interface ILikeButton {
  post: IPost;
  currentUser: IUser;
  invalidateKeys: (string | string[])[];
}

export const LikeButton: FC<ILikeButton> = ({
  post,
  currentUser,
  invalidateKeys,
}) => {
  const isLiked = post?.likes?.some(
    (like: ILike) => like.objectId === currentUser?.objectId,
  );

  const { mutate: toggleLike, isLoading: isLikeLoading } = useToggleLikePost(
    isLiked ? removeLikePostFn : likePostFn,
    invalidateKeys,
    post.user,
  );

  const handleToggleLike = useCallback(() => {
    if (!isLikeLoading && post) {
      toggleLike(post.objectId);
    }
  }, [isLikeLoading, toggleLike, post]);

  if (!post) {
    return null;
  }

  return (
    <div className={styles.like}>
      <button onClick={handleToggleLike} disabled={isLikeLoading}>
        <img
          src={isLiked ? heartIcon : heartOutlinedIcon}
          alt={isLiked ? 'Unlike' : 'Like'}
        />
      </button>
      {post?.likes?.length > 0 && <p>{post.likes.length}</p>}
    </div>
  );
};
