import { FC, useMemo, useState } from 'react';

// import UserList from 'entities/user/components/UserList';
import styles from './ProfilePage.module.scss';
import { Header } from 'widgets/header';
import { TabButtons } from 'shared/components';
import { useUser } from 'features/auth/useUser';
import { useUserPosts } from 'entities/post/hooks/useUserPosts';
import { Loader } from 'shared/ui';
import { UserPosts } from 'widgets/userPosts';
import { Album } from 'widgets/album/ui/Album';
import { ProfileHeader } from 'entities/profileHeader';

export const ProfilePage: FC = () => {
  const { user } = useUser();
  const { isLoading, posts, postsWithImages } = useUserPosts(user?.objectId);
  const onTagClick = () => {};

  const [activeTab, setActiveTab] = useState<'posts' | 'album'>('posts');

  const renderContent = useMemo(() => {
    switch (activeTab) {
      case 'posts':
        return <UserPosts posts={posts} onTagClick={onTagClick} user={user} />;
      case 'album':
        return <Album postsWithImages={postsWithImages} />;
      default:
        return null;
    }
  }, [activeTab, posts, postsWithImages, user]);

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
          <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
          {renderContent}
        </div>
      </section>
    </>
  );
};
