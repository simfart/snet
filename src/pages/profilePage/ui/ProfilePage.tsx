import { FC, useState } from 'react';

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
import { motion } from 'framer-motion';

export const ProfilePage: FC = () => {
  const { user } = useUser();
  const { isLoading, posts, postsWithImages } = useUserPosts(user?.objectId);
  const onTagClick = () => {};

  const [activeTab, setActiveTab] = useState<'posts' | 'album'>('posts');

  const handleTabClick = (tab: 'posts' | 'album') => {
    setActiveTab(tab);
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      backgroundColor: '#007bff',
      color: '#fff',
      transition: { duration: 0.2 },
    },
    active: { backgroundColor: '#0056b3', color: '#fff' },
  };

  if (isLoading) {
    return <Loader />;
  }

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
          <div className={styles.line}></div>
        </div>
        <div className={styles.profileContent}>
          <div className={styles.toggleButtons}>
            <motion.button
              className={activeTab === 'posts' ? styles.active : ''}
              onClick={() => handleTabClick('posts')}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              animate={activeTab === 'posts' ? 'active' : 'initial'}
            >
              Posts
            </motion.button>
            <motion.button
              className={activeTab === 'album' ? styles.active : ''}
              onClick={() => handleTabClick('album')}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              animate={activeTab === 'album' ? 'active' : 'initial'}
            >
              Album
            </motion.button>
          </div>
          <div
            className={`content-container ${
              activeTab === 'posts' ? 'active' : ''
            }`}
          ></div>
          <div
            className={`${styles.contentContainer} ${
              activeTab === 'album' ? styles.active : ''
            }`}
          >
            <div className={styles.albumContainer}>
              <h2>Album</h2>
              <div className={styles.album}>
                {postsWithImages?.map((post: IPost, index: number) => (
                  <div
                    key={post.objectId}
                    className={`${styles[`post${index + 1}`]} ${
                      styles.albumItem
                    }`}
                  >
                    <img
                      className={styles.albumImage}
                      src={post.image}
                      alt={post.objectId}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className={`${styles.contentContainer} ${
              activeTab === 'posts' ? styles.active : ''
            }`}
          >
            <div className={styles.profilePostContainer}>
              <h2>Create New Post</h2>
              <CreatePostForm user={user} variant="profilePage" />
              <div className={styles.profilePosts}>
                <h2>My Posts</h2>
                {posts?.map((post: IPost) => (
                  <Post
                    key={post.objectId}
                    post={post}
                    onTagClick={onTagClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// <div className={styles.post2}></div>
// <div className={styles.post3}></div>
// <div className={styles.post4}></div>
// <div className={styles.post5}></div>
// <div className={styles.post6}></div>
// <div className={styles.post7}></div>
// <div className={styles.post8}></div>
// <div className={styles.post9}></div>
// <div className={styles.post10}></div>
// <div className={styles.post11}></div>
// <div className={styles.post12}></div>
// <div className={styles.post13}></div>
