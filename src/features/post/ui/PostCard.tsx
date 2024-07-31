import { Post } from 'entities/post/model/types';
import { FC, useCallback } from 'react';
import { useDeletePost } from '../model/useDeletePost';
import { Loader } from 'shared/ui';
import { useUser } from 'pages/auth/ui/hooks';
import { useLikePost } from '../model/useLikePost';
import { useUnLikePost } from '../model/useUnLikePost';
// import { removeLike } from 'entities/post/model/api';

interface PostCardProps {
  post: Post;
}

export const PostCard: FC<PostCardProps> = ({ post }) => {
  const { mutate, isLoading } = useDeletePost();
  const { mutate: likePost } = useLikePost();
  const { mutate: unlikePost } = useUnLikePost();
  const currentUser = useUser();
  const isOwner = post.ownerId === currentUser.user?.objectId;
  const likes = post.likes || [];

  const isLiked = likes.some(
    (like: { objectId: string }) => like.objectId === currentUser.user?.ownerId,
  );

  console.log(isLiked);

  const handleDelete = useCallback(() => {
    if (isOwner) {
      mutate(post.objectId);
    }
  }, [isOwner, mutate, post.objectId]);

  const handleLike = useCallback(() => {
    likePost(post.objectId);
  }, [likePost, post.objectId]);

  const handUnleLike = useCallback(() => {
    unlikePost(post.objectId);
  }, [post.objectId, unlikePost]);

  if (isLoading) return <Loader />;

  return (
    <div className="postCard">
      <div className="header">
        <h2 className="title">{post.description}</h2>
        <span className="author">by {post.ownerId}</span>
      </div>
      <p>Likes: {post.likes.length}</p>
      <div className="footer">
        <span className="date">{new Date(post.created).toLocaleString()}</span>
        <div className="actions">
          {isLiked ? (
            <button className="dis" onClick={handUnleLike}>
              UnLike
            </button>
          ) : (
            <button className="likeButton" onClick={handleLike}>
              Like
            </button>
          )}

          <button className="commentButton">Comment</button>
          {isOwner && <button className="editButton">Edit</button>}
          {isOwner && (
            <button className="deleteButton" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
