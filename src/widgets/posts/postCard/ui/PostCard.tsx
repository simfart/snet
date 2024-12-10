import { FC, useCallback } from 'react';
import { motion } from 'framer-motion';

import { commentIcon } from 'shared/assets/images';
import { formatTimestamp } from 'shared/utils';
import { Avatar } from 'shared/components';
import { LikeButton } from 'features/toggleLike';
import { PostDescription } from 'entities/postDescription';
import { useCurrentUser } from 'entities/user/hooks';
import { useDeletePost } from 'entities/post/hooks';
import { IPost } from 'entities/post/model/PostModel';
import { Dropdown } from 'entities/dropdown';
import { buttonHoverAnimation } from 'shared/animations/animationSettings';

import styles from './PostCard.module.scss';

interface PostCardProps {
  post: IPost;
  onTagClick: (tagId: string, tagName: string) => void;
  onPostClick: (post: string) => void;
  variant?: 'profilePage';
  invalidateKeys: (string | string[])[];
}

export const PostCard: FC<PostCardProps> = ({
  post,
  onTagClick,
  onPostClick,
  variant,
  invalidateKeys,
}) => {
  const currentUser = useCurrentUser();
  const owner = post.user;
  const isOwner = post.ownerId === currentUser.user?.objectId;

  const { objectId: postId, description, image, created, tags = [] } = post;

  const { mutate: deletePost } = useDeletePost(invalidateKeys);

  const handleDelete = useCallback(() => {
    if (isOwner) {
      deletePost(postId);
    }
  }, [deletePost, isOwner, postId]);

  const handleTagClick = (tagId: string, tagName: string) => {
    onTagClick(tagId, tagName);
  };
  const handleClick = () => {
    onPostClick(postId);
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.header}>
        <div className={styles.user}>
          <Avatar owner={owner} variant="postAvatar" />
          <div className={styles.authorDetails}>
            <div className={styles.author}>{owner?.name}</div>
            <div className={styles.date}>{formatTimestamp(created)}</div>
          </div>
        </div>
        {(isOwner || variant === 'profilePage') && (
          <Dropdown dropdownAction={handleDelete} label="Delete Post" />
        )}
      </div>
      <PostDescription
        content={description}
        tags={tags}
        onTagClick={handleTagClick}
        onPostClick={handleClick}
      />
      {image && (
        <img
          className={styles.image}
          src={image}
          alt="Post"
          onClick={handleClick}
        />
      )}
      <div className={styles.footer}>
        <LikeButton
          currentUser={currentUser.user}
          post={post}
          invalidateKeys={invalidateKeys}
        />
        <div className={styles.action}>
          <button>
            <motion.img
              src={commentIcon}
              alt="Comment Icon"
              onClick={handleClick}
              {...buttonHoverAnimation}
            />
          </button>
          {post?.comments?.length > 0 && <p>{post.comments.length}</p>}
        </div>
      </div>
    </div>
  );
};
