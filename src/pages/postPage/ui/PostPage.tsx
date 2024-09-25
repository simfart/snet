import { FC } from 'react';

import styles from './PostPage.module.scss';
import { useLocation } from 'react-router-dom';
import { Header } from 'widgets/header';
import { useUser } from 'features/auth/useUser';
import { Avatar } from 'shared/components';
import { formatTimestamp } from 'shared/utils';
import { LikeButton } from 'features/toggleLike';
import { usePost } from 'entities/post/hooks/usePost';
import { Loader } from 'shared/ui';
import { PostDescription } from 'entities/postDescription';

export const PostPage: FC = () => {
  const location = useLocation();
  const { selectedPost } = location.state || {};
  const { post, isLoading } = usePost(selectedPost);
  const owner = post?.user[0];
  const { user: currentUser } = useUser();

  console.log('selectedPost', selectedPost);
  console.log('post', post);
  console.log('owner', owner);

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
            <LikeButton currentUser={currentUser} post={post} />
          </div>
          {post?.description && (
            <PostDescription
              content={description}
              isExpanded={isExpanded}
              onToggle={toggleExpand}
              tags={tags}
              onTagClick={handleTagClick}
              onPostClick={handleClick}
            />
          )}

          {post?.image && <img src={post.image} alt="Post image" />}
        </div>
        <div className={styles.comments}></div>
      </section>
    </>
  );
};
