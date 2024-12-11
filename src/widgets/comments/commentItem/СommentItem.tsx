import { FC, useCallback } from 'react';
import { formatTimestamp } from 'shared/utils';
import { Avatar } from 'shared/components';
import { Dropdown } from 'entities/dropdown';
import { useCurrentUser } from 'entities/user/hooks';
import { IComment } from 'entities/comment/model/CommentModel';
import styles from './СommentItem.module.scss';

interface PostProps {
  comment: IComment;
  deleteComment: (commentId: string) => void;
}

export const СommentItem: FC<PostProps> = ({ comment, deleteComment }) => {
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
    <div className={styles.commentContainer} key={commentId}>
      <div className={styles.header}>
        <div className={styles.user}>
          <Avatar owner={owner} variant="postAvatar" />
          <div className={styles.authorDetails}>
            <div className={styles.author}>{owner?.name}</div>
            <div className={styles.date}>{formatTimestamp(created)}</div>
          </div>
        </div>
        {isOwner && (
          <Dropdown dropdownAction={handleDelete} label="Delete comment" />
        )}
      </div>
      <div className={styles.commentText}>{text}</div>
    </div>
  );
};
