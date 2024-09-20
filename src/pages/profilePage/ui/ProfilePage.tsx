import { FC } from 'react';

// import UserList from 'entities/user/components/UserList';
import styles from './ProfilePage.module.scss';
import { Header } from 'widgets/header';
import { Avatar } from 'shared/components';
import { useUser } from 'features/auth/useUser';
import { CreatePostForm } from 'features/сreatePostForm';
import { useUserPosts } from 'entities/post/hooks/useUserPosts';
import { IPost } from 'entities/post/model/PostModel';
import { Post } from 'entities/post';
import { Loader } from 'shared/ui';

export const ProfilePage: FC = () => {
  const { user } = useUser();
  const { isLoading, posts, postsWithImages } = useUserPosts(user?.objectId);
  const onTagClick = () => {};

  isLoading && <Loader />;
  return (
    <>
      <Header />
      <section className={styles.profilePage}>
        <div className={styles.profileHeader}>
          <div className={styles.backdrop}></div>
          <Avatar owner={user} variant="profilePage" />
          <div className={styles.profileInfo}>
            <h1>{user?.name}</h1>
            <span>{user?.about}</span>
          </div>
          <div className={styles.stat}>
            <div className={styles.statItem}>
              <div> 1,289</div>
              <span>Followers</span>
            </div>
            <div className={styles.statItem}>
              <div> 500</div>
              <span>Friends</span>
            </div>
          </div>
        </div>
        <div className={styles.profileContent}>
          <div className={styles.albumContainer}>
            <h2>Album</h2>
            <div className={styles.album}>
              {postsWithImages?.map((post: IPost) => (
                <div key={post.objectId} className={styles.albumItem}>
                  <img
                    className={styles.albumImage}
                    src={post.image}
                    alt={post.objectId}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.profilePostContainer}>
            <CreatePostForm user={user} />
            <div className={styles.profilePosts}>
              <h2>My Posts</h2>

              {posts?.map((post: IPost) => (
                <Post key={post.objectId} post={post} onTagClick={onTagClick} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
