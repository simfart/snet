import { FC, useCallback } from 'react';
import { formatTimestamp } from 'shared/utils';
import { Avatar } from 'shared/components';
import { PostDropdown } from 'entities/dropdown/postDropdown/PostDropdown';

import { IComment } from '../model';

import styles from './Comment.module.scss';
import { useCurrentUser } from 'features/auth/useCurrentUser';

interface PostProps {
  comment: IComment;
  deleteComment: (commentId: string) => void;
}

export const Comment: FC<PostProps> = ({ comment, deleteComment }) => {
  const currentUser = useCurrentUser();
  const owner = comment.user;

  const isOwner = comment.user.objectId === currentUser.user?.objectId;

  const { objectId: commentId, text, created } = comment;

  const handleDelete = useCallback(() => {
    if (isOwner) {
      deleteComment(commentId);
    }
  }, [isOwner, deleteComment, commentId]);

  return (
    <div className={styles.postContainer} key={commentId}>
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
      <div>{text}</div>
    </div>
  );
};
