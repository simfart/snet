import React, { useState } from 'react';
import styles from './LinkedInPost.module.scss';
import { commentIcon, heartIcon } from 'shared/assets/images';

interface LinkedInPostProps {
  author: string;
  authorTitle: string;
  date: string;
  content: string;
  image?: string;
  authorImage?: string;
}

const LinkedInPost: React.FC<LinkedInPostProps> = ({
  author,
  date,
  content,
  image,
  authorImage,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
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
      <div className={styles.content}>
        {isExpanded ? content : `${content.substring(0, 100)}...`}
        <span className={styles.readMore} onClick={toggleReadMore}>
          {isExpanded ? 'Show less' : 'Read more'}
        </span>
      </div>
      {image && <img className={styles.image} src={image} alt="Post" />}
      <div className={styles.footer}>
        <button className={styles.action}>
          <img src={heartIcon} alt="Comment Icon" />
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

export default LinkedInPost;
