import { FC } from 'react';
import { IComment } from '../model';
import { Comment } from './Сomment';

export const CommentList: FC<{
  comments: IComment[];
  deleteComment: (commentId: string) => void;
}> = ({ comments, deleteComment }) => {
  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <Comment
            key={comment.objectId}
            comment={comment}
            deleteComment={deleteComment}
          />
        ))}
    </div>
  );
};
