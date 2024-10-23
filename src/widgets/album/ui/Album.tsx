import { FC } from 'react';
import { IPost } from 'entities/post/model/PostModel';
import styles from './Album.module.scss';

interface PostsWithImagesProps {
  postsWithImages: IPost[] | undefined;
}

export const Album: FC<PostsWithImagesProps> = ({ postsWithImages }) => (
  <div className={styles.albumContainer}>
    <h2>Album</h2>
    <div className={styles.album}>
      {postsWithImages?.map((post: IPost, index: number) => (
        <div
          key={post.objectId}
          className={`${styles[`post${index + 1}`]} ${styles.albumItem}`}
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
);
