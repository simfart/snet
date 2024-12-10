import { FC, useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from 'widgets/header';
import { UserPostList } from 'widgets/posts';
import { Album } from 'widgets/album';
import { ProfileHeader } from 'entities/profileHeader';
import { useCurrentUser, useUser } from 'entities/user/hooks';
import { useUserPosts } from 'entities/post/hooks';
import { TabButtons } from 'shared/components';
import { Loader } from 'shared/ui';
import styles from './ProfilePage.module.scss';

export const ProfilePage: FC = () => {
  const { objectId } = useParams<{ objectId: string }>();
  const { user } = useUser(objectId!);
  const { user: currentUser } = useCurrentUser();

  const { posts, isLoading, postsWithImages } = useUserPosts(objectId);
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
          <UserPostList
            posts={posts}
            user={currentUser}
            onTagClick={onTagClick}
            onPostClick={handlePostClick}
            isOwner={isOwner}
          />
        );
      case 'album':
        return <Album postsWithImages={postsWithImages} />;
      default:
        return null;
    }
  }, [
    activeTab,
    posts,
    currentUser,
    handlePostClick,
    isOwner,
    postsWithImages,
  ]);

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
          <UserPostList
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
