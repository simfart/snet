import React from 'react';
import styles from './Post.module.scss';

interface PostProps {
  author: string;
  date: string;
  content: string;
  image?: string;
}

export const Post: React.FC<PostProps> = ({ author, date, content, image }) => {
  return (
    <div className={styles.postContainer}>
      <div className={styles.header}>
        <div className={styles.author}>{author}</div>
        <div className={styles.date}>{date}</div>
      </div>
      <div className={styles.content}>{content}</div>
      {image && <img className={styles.image} src={image} alt="Post image" />}
      <div className={styles.footer}>
        <button className={styles.likeButton}>Like</button>
        <button className={styles.commentButton}>Comment</button>
        <button className={styles.shareButton}>Share</button>
      </div>
    </div>
  );
};
