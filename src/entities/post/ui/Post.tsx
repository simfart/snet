import { FC, useState } from 'react';
import { commentIcon, heartIcon } from 'shared/assets/images';
import { PostContent } from './post-content/PostContent';

import styles from './Post.module.scss';
import { IPost } from '../model/PostModel';

// interface PostProps {
//   author: string;
//   authorTitle: string;
//   date: string;
//   content: string;
//   image?: string;
//   authorImage?: string;
// }

interface PostProps {
  post: IPost;
}

export const Post: FC<PostProps> = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.header}>
        <img
          className={styles.authorImage}
          src={post.user.avatar || 'https://via.placeholder.com/50'}
          alt="Author"
        />
        <div className={styles.authorDetails}>
          <div className={styles.author}>{post.user.name}</div>
          <div className={styles.date}>{post.created}</div>
        </div>
      </div>
      <PostContent
        content={post.description}
        isExpanded={isExpanded}
        onToggle={toggleExpand}
      />
      {post.image && (
        <img className={styles.image} src={post.image} alt="Post" />
      )}
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
