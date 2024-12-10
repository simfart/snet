import { FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { IPost } from 'entities/post/model/PostModel';
import { ImageModal } from 'features/imageModal';
import styles from './Album.module.scss';

interface PostsWithImagesProps {
  postsWithImages: IPost[] | undefined;
}

export const Album: FC<PostsWithImagesProps> = ({ postsWithImages }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImage = (image: string | undefined) => {
    if (image) {
      setSelectedImage(image);
    }
  };
  const closeImage = () => setSelectedImage(null);

  return (
    <div className={styles.albumContainer}>
      <h2>Album</h2>
      <div className={styles.album}>
        {postsWithImages?.map((post: IPost, index: number) => (
          <div
            key={post.objectId}
            className={`${styles[`post${index + 1}`]} ${styles.albumItem}`}
            onClick={() => openImage(post.image)}
          >
            <img
              className={styles.albumImage}
              src={post.image}
              alt={post.objectId}
            />
          </div>
        ))}
      </div>
      <AnimatePresence>
        {selectedImage && (
          <ImageModal src={selectedImage} onClose={closeImage} />
        )}
      </AnimatePresence>
    </div>
  );
};
