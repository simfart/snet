import React from 'react';
import { Comment } from 'features/Comment/ui/Comment';
import { useComments } from 'features/Comment/model/useComments';

export const CommentList = ({ postId }) => {
  const { comments } = useComments(postId);
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
