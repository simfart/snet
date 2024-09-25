import { FC, useCallback } from 'react';
import { commentIcon } from 'shared/assets/images';

import { IPost } from '../model/PostModel';
import { useDeletePost } from '../hooks/useDeletePost';
import { useUser } from 'features/auth/useUser';
import { formatTimestamp } from 'shared/utils';

import styles from './Post.module.scss';
import { Avatar } from 'shared/components';
import { PostDropdown } from 'entities/dropdown/postDropdown/PostDropdown';
import { LikeButton } from 'features/toggleLike';
import { PostDescription } from 'entities/postDescription';

interface PostProps {
  post: IPost;
  onTagClick: (tagId: string, tagName: string) => void;
  onPostClick: (post: string) => void;
}

export const Post: FC<PostProps> = ({ post, onTagClick, onPostClick }) => {
  const currentUser = useUser();
  const owner = post.user[0];
  const isOwner = post.ownerId === currentUser.user?.objectId;

  const { objectId: postId, description, image, created, tags = [] } = post;

  const { mutate: deletePost } = useDeletePost();

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
        {isOwner && <PostDropdown onDeleteClick={handleDelete} />}
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
        <LikeButton currentUser={currentUser.user} post={post} />
        <div className={styles.action}>
          <button>
            <img src={commentIcon} alt="Comment Icon" />
          </button>
          <p>45</p>
        </div>
      </div>
    </div>
  );
};
