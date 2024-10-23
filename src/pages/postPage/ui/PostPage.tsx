import { FC, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from 'widgets/header';
import { CommentList } from 'widgets/comments';
import { LikeButton } from 'features/toggleLike';
import { usePost } from 'entities/post/hooks';
import { useCreateComment, useDeleteComment } from 'entities/comment/hooks';
import { useCurrentUser } from 'entities/user/hooks';
import { PostDescription } from 'entities/postDescription';
import { InputPanel } from 'entities/inputPanel';
import { Avatar } from 'shared/components';
import { formatTimestamp } from 'shared/utils';
import { Loader } from 'shared/ui';
import { QUERY_KEY } from 'shared/constants/queryKeys';
import styles from './PostPage.module.scss';

export const PostPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedPost } = location.state || {};
  const { post, isLoading, setPostData } = usePost(selectedPost);
  const { user: currentUser } = useCurrentUser();
  const owner = post?.user;
  console.log(post);
  const { mutate } = useCreateComment(post, setPostData);

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

  if (isLoading) return <Loader />;
  return (
    <>
      <Header />
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
            />
          </div>
          {post?.description && (
            <PostDescription
              content={post?.description}
              tags={post?.tags}
              onTagClick={handleTagClick}
              variant="postPage"
            />
          )}
          {post?.image && <img src={post.image} alt="Post image" />}
        </div>
        <div className={styles.comments}>
          <InputPanel
            user={currentUser}
            onSubmit={handleSubmit}
            selectedPost={post}
          />
          {post?.comments && (
            <CommentList
              comments={post.comments}
              deleteComment={deleteComment}
            />
          )}
        </div>
      </section>
    </>
  );
};
