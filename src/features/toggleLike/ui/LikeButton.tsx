import { FC, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useToggleLikePost } from '../hooks/useToggleLikePost';
import { likePostFn, removeLikePostFn } from 'entities/post/api/postApi';
import { IPost } from 'entities/post/model/PostModel';
import { IUser } from 'entities/user/model/userModel';
import { heartIcon, heartOutlinedIcon } from 'shared/assets/images';
import { likeButtonAnimations } from 'shared/animations/animationSettings';
import styles from './LikeButton.module.scss';

interface ILike {
  objectId: string;
}

interface ILikeButton {
  post: IPost;
  currentUser: IUser;
  invalidateKeys: (string | string[])[];
  variant?: 'postPage';
}

export const LikeButton: FC<ILikeButton> = ({
  post,
  currentUser,
  invalidateKeys,
  variant,
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
    <div
      className={`${styles.like} ${variant === 'postPage' && styles.postPage}`}
    >
      <button onClick={handleToggleLike} disabled={isLikeLoading}>
        <motion.img
          key={isLiked ? 'liked' : 'unliked'}
          src={isLiked ? heartIcon : heartOutlinedIcon}
          alt={isLiked ? 'Unlike' : 'Like'}
          {...likeButtonAnimations}
        />
      </button>
      {post?.likes?.length > 0 && <p>{post.likes.length}</p>}
    </div>
  );
};
