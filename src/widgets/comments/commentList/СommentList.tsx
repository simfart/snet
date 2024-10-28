import { FC } from 'react';
import { IComment } from 'entities/comment/model/CommentModel';
import { СommentItem } from '../commentItem';

export const CommentList: FC<{
  comments: IComment[];
  deleteComment: (commentId: string) => void;
}> = ({ comments, deleteComment }) => {
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
  );
  return (
    <div>
      {sortedComments &&
        sortedComments.map((comment) => (
          <СommentItem
            key={comment.objectId}
            comment={comment}
            deleteComment={deleteComment}
          />
        ))}
    </div>
  );
};
