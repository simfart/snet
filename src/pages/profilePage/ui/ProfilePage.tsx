import { FC, useCallback, useMemo, useState } from 'react';

// import UserList from 'entities/user/components/UserList';
import { Header } from 'widgets/header';
import { TabButtons } from 'shared/components';
import { useUserPosts } from 'entities/post/hooks/useUserPosts';
import { Loader } from 'shared/ui';
import { UserPosts } from 'widgets/userPosts';
import { Album } from 'widgets/album/ui/Album';
import { ProfileHeader } from 'entities/profileHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { useCurrentUser } from 'features/auth/useCurrentUser';

import styles from './ProfilePage.module.scss';
import { useUser } from 'features/auth/useUser';

export const ProfilePage: FC = () => {
  const { objectId } = useParams<{ objectId: string }>();
  const { user } = useUser(objectId!);
  const { user: currentUser } = useCurrentUser();

  const { isLoading, posts, postsWithImages } = useUserPosts(objectId);

  const isOwner =
    currentUser && user ? currentUser.objectId === user.objectId : false;

  const onTagClick = () => {};
  const navigate = useNavigate();
  const handlePostClick = useCallback(
    (postId: string) => {
      navigate('/post', { state: { selectedPost: postId } });
    },
    [navigate],
  );

  const [activeTab, setActiveTab] = useState<'posts' | 'album'>('posts');

  const renderContent = useMemo(() => {
    switch (activeTab) {
      case 'posts':
        return (
          <UserPosts
            posts={posts}
            user={currentUser}
            onTagClick={onTagClick}
            onPostClick={handlePostClick}
          />
        );
      case 'album':
        return <Album postsWithImages={postsWithImages} />;
      default:
        return null;
    }
  }, [activeTab, handlePostClick, posts, postsWithImages, currentUser]);

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
            onTagClick={onTagClick}
            posts={posts}
            user={currentUser}
            onPostClick={handlePostClick}
            isOwner={isOwner}
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
