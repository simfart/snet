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
}

export const LikeButton: FC<ILikeButton> = ({ post, currentUser }) => {
  const { objectId: postId, likes = [] } = post;
  const isLiked = likes.some(
    (like: ILike) => like.objectId === currentUser?.objectId,
  );
  const { mutate: toggleLike, isLoading: isLikeLoading } = useToggleLikePost(
    isLiked ? removeLikePostFn : likePostFn,
  );

  const handleToggleLike = useCallback(() => {
    if (!isLikeLoading) {
      toggleLike(postId);
    }
  }, [toggleLike, postId, isLikeLoading]);

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
      {likes.length > 0 && <p>{likes.length}</p>}
    </div>
  );
};
