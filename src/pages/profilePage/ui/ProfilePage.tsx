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
import { UserPosts } from 'widgets/userPosts';
import { Album } from 'widgets/album/ui/Album';
import { ProfileHeader } from 'entities/profileHeader';

export const ProfilePage: FC = () => {
  const { user } = useUser();
  const { isLoading, posts, postsWithImages } = useUserPosts(user?.objectId);
  const onTagClick = () => {};

  // // Мемоизация постов
  // const memoizedPosts = useMemo(() => posts, [posts]);

  // // Мемоизация постов с изображениями
  // const memoizedPostsWithImages = useMemo(() => postsWithImages, [postsWithImages]);

  console.log(posts);
  const [activeTab, setActiveTab] = useState<'posts' | 'album'>('posts');

  const handleTabClick = (tab: 'posts' | 'album') => setActiveTab(tab);

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return <UserPosts posts={posts} onTagClick={onTagClick} user={user} />;
      case 'album':
        return <Album postsWithImages={postsWithImages} />;
      default:
        return null;
    }
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
        <ProfileHeader user={user} variant="page" />
        <div className={`${styles.profileContent} ${styles.fullScreen}`}>
          <Album postsWithImages={postsWithImages} />
          <UserPosts onTagClick={onTagClick} posts={posts} user={user} />
        </div>
        <div className={`${styles.profileContent} ${styles.minimized}`}>
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
          {renderContent()}
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
