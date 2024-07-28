import React from 'react';
import { Post } from 'entities/post/model/types';
// import { useDispatch } from 'react-redux';
// import { deletePost } from 'features/Post/model/postsSlice';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  //   const dispatch = useDispatch();

  //   const handleDelete = () => {
  //     dispatch(deletePost(post.id));
  //   };

  return (
    <></>
    // <div className={styles.postCard}>
    //   <div className={styles.header}>
    //     <h2 className={styles.title}>{post.title}</h2>
    //     <span className={styles.author}>by {post.author}</span>
    //   </div>
    //   <p className={styles.content}>{post.content}</p>
    //   <div className={styles.footer}>
    //     <span className={styles.date}>
    //       {new Date(post.date).toLocaleDateString()}
    //     </span>
    //     <div className={styles.actions}>
    //       <button className={styles.likeButton}>Like</button>
    //       <button className={styles.commentButton}>Comment</button>
    //       <button className={styles.editButton}>Edit</button>
    //       <button className={styles.deleteButton} onClick={handleDelete}>
    //         Delete
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};
