import { FC, useState } from 'react';
import styles from './Post.module.scss';
import { commentIcon, heartIcon } from 'shared/assets/images';
import { PostContent } from './post-content/PostContent';

interface PostProps {
  author: string;
  authorTitle: string;
  date: string;
  content: string;
  image?: string;
  authorImage?: string;
}

export const Post: FC<PostProps> = ({
  author,
  date,
  content,
  image,
  authorImage,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.header}>
        <img
          className={styles.authorImage}
          src={authorImage || 'https://via.placeholder.com/50'}
          alt="Author"
        />
        <div className={styles.authorDetails}>
          <div className={styles.author}>{author}</div>
          <div className={styles.date}>{date}</div>
        </div>
      </div>
      <PostContent
        content={content}
        isExpanded={isExpanded}
        onToggle={toggleExpand}
      />
      {image && <img className={styles.image} src={image} alt="Post" />}
      <div className={styles.footer}>
        <button className={styles.action}>
          <img src={heartIcon} alt="Like Icon" />
          <span>100</span>
        </button>
        <button className={styles.action}>
          <img src={commentIcon} alt="Comment Icon" />
          <span>45</span>
        </button>
      </div>
    </div>
  );
};
