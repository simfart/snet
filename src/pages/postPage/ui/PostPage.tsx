import { FC } from 'react';

import styles from './PostPage.module.scss';
import { useLocation } from 'react-router-dom';
import { Header } from 'widgets/header';
import { useUser } from 'features/auth/useUser';
import { Avatar } from 'shared/components';
import { formatTimestamp } from 'shared/utils';
import { LikeButton } from 'entities/toggleLike';
import { usePost } from 'entities/post/hooks/usePost';

export const PostPage: FC = () => {
  const location = useLocation();
  const { selectedPost } = location.state || {}; // Получаем postId из состояния
  const { post, isLoading, error } = usePost(selectedPost); // Получаем данные поста
  const owner = post?.user[0];
  const { user: currentUser } = useUser();

  console.log('selectedPost', selectedPost);
  console.log('post', post);
  console.log('owner', owner);
  const {
    objectId: postId,
    likes = [],
    description,
    image,
    created,
    tags = [],
  } = post;

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
                <div className={styles.date}>{formatTimestamp(created)}</div>
              </div>
            </div>
            <LikeButton currentUser={currentUser} post={post} />
          </div>
          {description && <p>{description}</p>}
          {image && <img src={image} alt="Post image" />}
        </div>
        <div className={styles.comments}></div>
      </section>
    </>
  );
};
