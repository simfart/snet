import { FC } from 'react';

import { Loader } from 'shared/ui';
import { usePosts } from 'features/post/hooks/usePosts';
import { IPost } from 'entities/post/model/PostModel';
// import { PostCard } from 'features/post';

import styles from './Posts.module.scss';
import { Post } from 'entities/post';
import { useUser } from 'features/auth/useUser';
import { CreatePostForm } from 'features/сreatePostForm/ui/CreatePostForm';
import { useTagFilteredPosts } from 'features/post/hooks/useTagFilteredPosts';
import { useSearchFilteredPosts } from 'features/post/hooks/useSearchFilteredPosts';

interface PostsProps {
  selectedTagId: string | null;
  searchTerm: string | null;
  onTagClick: (tagId: string) => void;
}

export const Posts: FC<PostsProps> = ({
  selectedTagId,
  onTagClick,
  searchTerm,
}) => {
  const { posts, isLoading, error, isFetching } = usePosts();
  const { user } = useUser();

  const { filteredPosts, filteredPostsError, isFilteredPostsLoading } =
    useTagFilteredPosts(selectedTagId);

  const { foundPosts, isfoundPostsLoading, foundPostsError } =
    useSearchFilteredPosts(searchTerm);

  if (isLoading || isFetching || isFilteredPostsLoading || isfoundPostsLoading)
    return <Loader />;
  if (error || filteredPostsError)
    return (
      <div>
        Error:{' '}
        {
          (
            (error as Error) ||
            (filteredPostsError as Error) ||
            (foundPostsError as Error)
          )?.message
        }
      </div>
    );

  return (
    <div className={styles.postsContainer}>
      <div className={styles.createPostFormWrapper}>
        <CreatePostForm user={user} />
      </div>
      <div className={styles.posts}>
        {(filteredPosts || foundPosts || posts)?.map((post: IPost) => (
          <Post key={post.objectId} post={post} onTagClick={onTagClick} />
        ))}
      </div>
    </div>
  );
};
