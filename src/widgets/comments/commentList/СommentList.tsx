import { FC } from 'react';
import { IComment } from 'entities/comment/model/CommentModel';
import { СommentItem } from '../commentItem';

export const CommentList: FC<{
  comments: IComment[];
  deleteComment: (commentId: string) => void;
}> = ({ comments, deleteComment }) => {
  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <СommentItem
            key={comment.objectId}
            comment={comment}
            deleteComment={deleteComment}
          />
        ))}
    </div>
  );
};
