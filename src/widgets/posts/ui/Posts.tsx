import { FC } from 'react';

import { Loader } from 'shared/ui';
import { usePosts } from 'features/post/model/usePosts';
import { IPost } from 'entities/post/model/PostModel';
import { PostCard } from 'features/post';

import styles from './Posts.module.scss';
import { Post } from 'entities/post';
import { CreatePostForm } from 'features/сreatePostForm';
import { useUser } from 'features/auth/useUser';

export const Posts: FC = () => {
  const { posts, isLoading, error, isFetching } = usePosts();
  const { user } = useUser();

  if (isLoading || isFetching) return <Loader />;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    // <div>
    //   {posts?.map((post: IPost) => (
    //     <PostCard key={post.objectId} post={post} />
    //   ))}
    // </div>
    <div className={styles.postsContainer}>
      <CreatePostForm name={user?.name} avatar={user?.avatar} />
      <div className={styles.posts}>
        <Post
          author="John Doe"
          authorTitle="Software Engineer at TechCorp"
          date="1h ago"
          content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          image="https://via.placeholder.com/600x300"
          authorImage="https://via.placeholder.com/50"
        />
        <Post
          author="Jane Smith"
          authorTitle="Marketing Specialist at MarketGurus"
          date="3h ago"
          content="Had a great time at the marketing conference today. Had a great time at the marketing conference todayLots of insights and networking!"
        />
      </div>
    </div>
  );
};
