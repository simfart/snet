import { FC, useCallback, useState } from 'react';
import {
  commentIcon,
  heartIcon,
  heartOutlinedIcon,
} from 'shared/assets/images';
import { PostContent } from './post-content/PostContent';
import { IPost } from '../model/PostModel';
import { Dropdown } from 'shared/components/dropdown';
import { useDeletePost } from '../hooks/useDeletePost';
import { useUser } from 'features/auth/useUser';
import { likePostFn, removeLikePostFn } from '../api/postApi';
import { useToggleLikePost } from '../hooks/useToggleLikePost';
import { formatTimestamp } from 'shared/utils';

import styles from './Post.module.scss';
import { Avatar } from 'shared/components';

interface Like {
  objectId: string;
}

interface PostProps {
  post: IPost;
  onTagClick: (tagId: string) => void;
}

export const Post: FC<PostProps> = ({ post, onTagClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentUser = useUser();
  const owner = post.user[0];
  const isOwner = post.ownerId === currentUser.user?.objectId;

  const {
    objectId: postId,
    likes = [],
    description,
    image,
    created,
    tags = [],
  } = post;

  const isLiked = likes.some(
    (like: Like) => like.objectId === currentUser.user?.objectId,
  );
  const { mutate: deletePost } = useDeletePost();
  const { mutate: toggleLike, isLoading: isLikeLoading } = useToggleLikePost(
    isLiked ? removeLikePostFn : likePostFn,
  );

  const handleDelete = useCallback(() => {
    if (isOwner) {
      deletePost(postId);
    }
  }, [deletePost, isOwner, postId]);

  const handleToggleLike = useCallback(() => {
    if (!isLikeLoading) {
      toggleLike(postId);
    }
  }, [toggleLike, postId, isLikeLoading]);

  const postSettingsMenuItems = [
    {
      label: 'Delete Post',
      onClick: handleDelete,
    },
  ];

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handleTagClick = (tagId: string) => {
    onTagClick(tagId);
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
        {isOwner && (
          <Dropdown menuItems={postSettingsMenuItems} variant="post" />
        )}
      </div>
      <PostContent
        content={description}
        isExpanded={isExpanded}
        onToggle={toggleExpand}
        tags={tags}
        onTagClick={handleTagClick}
      />
      {image && <img className={styles.image} src={image} alt="Post" />}
      <div className={styles.footer}>
        <div className={styles.action}>
          <button className={styles.like} onClick={handleToggleLike}>
            <img
              src={isLiked ? heartIcon : heartOutlinedIcon}
              alt={isLiked ? 'Unlike' : 'Like'}
            />
          </button>
          <p>{likes.length > 0 ? likes.length : ''}</p>
        </div>
        <button className={styles.action}>
          <img src={commentIcon} alt="Comment Icon" />
          {/* <p>45</p> */}
        </button>
      </div>
    </div>
  );
};
