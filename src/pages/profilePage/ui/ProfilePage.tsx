import { FC, useCallback, useMemo, useState } from 'react';

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
import { useNavigate } from 'react-router-dom';

export const ProfilePage: FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { isLoading, posts, postsWithImages } = useUserPosts(user?.objectId);

  const [activeTab, setActiveTab] = useState<'posts' | 'album'>('posts');

  const handlePostClick = useCallback(
    (postId: string) => {
      navigate('/post', { state: { selectedPost: postId } });
    },
    [navigate],
  );

  const handleTagClick = useCallback(
    (tagId: string, tagName: string) => {
      navigate(`/?tag=${tagId}&tagName=${encodeURIComponent(tagName)}`);
    },
    [navigate],
  );

  const renderContent = useMemo(() => {
    if (activeTab === 'posts') {
      return (
        <UserPosts
          posts={posts}
          user={user}
          onTagClick={() => {}}
          onPostClick={handlePostClick}
        />
      );
    } else if (activeTab === 'album') {
      return <Album postsWithImages={postsWithImages} />;
    }
    return null;
  }, [activeTab, handlePostClick, posts, postsWithImages, user]);
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
          <UserPosts
            onTagClick={handleTagClick}
            posts={posts}
            user={user}
            onPostClick={handlePostClick}
          />
        </div>
        <div className={`${styles.profileContent} ${styles.minimized}`}>
          <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
          {renderContent}
        </div>
      </section>
    </>
  );
};
