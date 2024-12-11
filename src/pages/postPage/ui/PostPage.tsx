import { FC, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from 'widgets/header';
import { CommentList } from 'widgets/comments';
import { LikeButton } from 'features/toggleLike';
import { usePost } from 'entities/post/hooks';
import { useCreateComment, useDeleteComment } from 'entities/comment/hooks';
import { useCurrentUser } from 'entities/user/hooks';
import { PostDescription } from 'entities/postDescription';
import { InputPanel } from 'entities/inputPanel';
import { Avatar, Button } from 'shared/components';
import { formatTimestamp } from 'shared/utils';
import { Loader } from 'shared/ui';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import { commentIcon, writeIcon } from 'shared/assets/images';
import { AnimatePresence } from 'framer-motion';
import { ImageModal } from 'features/imageModal';
import styles from './PostPage.module.scss';

export const PostPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedPost } = location.state || {};
  const { post, isLoading, setPostData } = usePost(selectedPost);
  const { user: currentUser } = useCurrentUser();
  const owner = post?.user;

  const { mutate } = useCreateComment(post, setPostData);

  const [isNewPostOpen, setNewPostOpen] = useState(false);

  const handleTagClick = useCallback(
    (tagId: string, tagName: string) => {
      navigate(`/?tag=${tagId}&tagName=${encodeURIComponent(tagName)}`);
    },
    [navigate],
  );

  const handleSubmit = (text: string) => {
    if (!post) {
      console.error('Post is undefined');
      return;
    }
    const postId = post.objectId;
    mutate({ text, postId });
  };
  const { mutate: commentDelete } = useDeleteComment(post, setPostData);

  const deleteComment = (commentId: string) => {
    commentDelete({ commentId, postId: post.objectId });
  };
  const handleClick = () => setNewPostOpen(!isNewPostOpen);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImage = (image: string | undefined) => {
    if (image) {
      setSelectedImage(image);
    }
  };
  const closeImage = () => setSelectedImage(null);

  if (isLoading) return <Loader />;
  return (
    <>
      <Header />
      {post && (
        <section className={styles.postContainer}>
          <div className={styles.post}>
            <div className={styles.postOwner}>
              <div className={styles.user}>
                <Avatar owner={owner} variant="postAvatar" />
                <div className={styles.authorDetails}>
                  <div className={styles.author}>{owner?.name}</div>
                  <div className={styles.date}>
                    {formatTimestamp(post?.created)}
                  </div>
                </div>
              </div>
              <LikeButton
                currentUser={currentUser}
                post={post}
                invalidateKeys={[[QUERY_KEY.post, post?.objectId]]}
                variant="postPage"
              />
            </div>
            {post.image ? (
              post.description && (
                <PostDescription
                  content={post?.description}
                  tags={post?.tags}
                  onTagClick={handleTagClick}
                  variant="postPage"
                />
              )
            ) : (
              <div className={styles.description}>{post.description}</div>
            )}
            {post.image && (
              <img
                className={styles.postImage}
                src={post.image}
                alt="Post image"
                onClick={() => openImage(post.image)}
              />
            )}
          </div>
          <div className={styles.comments}>
            <div className={styles.commentsHeader}>
              <div className={styles.commentsTitle}>
                <img
                  className={styles.commentsImg}
                  src={commentIcon}
                  alt="Comment Icon"
                />
                Comments
                {post.comments.length > 0 && (
                  <span className={styles.commentsCount}>
                    {post.comments.length}
                  </span>
                )}
              </div>
              <Button
                variant="lightcolor"
                label="Write comment"
                icon={writeIcon}
                onClick={handleClick}
              />
            </div>
            {isNewPostOpen && (
              <InputPanel
                user={currentUser}
                onSubmit={handleSubmit}
                selectedPost={post}
              />
            )}

            {post?.comments && (
              <CommentList
                comments={post.comments}
                deleteComment={deleteComment}
              />
            )}
          </div>
        </section>
      )}
      <AnimatePresence>
        {selectedImage && (
          <ImageModal src={selectedImage} onClose={closeImage} />
        )}
      </AnimatePresence>
    </>
  );
};
