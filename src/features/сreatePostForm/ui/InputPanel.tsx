import { motion } from 'framer-motion';

import styles from './CreatePostForm.module.scss';

import React, { useState } from 'react';
import { IUser } from 'entities/user/model/userModel';
import { Avatar, Button } from 'shared/components';
import { IPost } from 'entities/post/model/PostModel';

interface Props {
  selectedPost: IPost;
  user: IUser;
  variant?: 'profilePage';
  onSubmit: (content: string) => void;
}

export const InputPanel: React.FC<Props> = ({ user, variant, onSubmit }) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() === '') {
      alert('Please fill out the required field.');
      return;
    }

    const content = value.replace(/#\w+/g, '').trim();

    onSubmit(content);
    setValue('');
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className={`${styles.createPostContainer} ${
          variant === 'profilePage' && styles.profilePage
        }`}
      >
        <div className={styles.header}>
          <Avatar owner={user} variant="postAvatar" />
          <div className={styles.authorDetails}>
            <div className={styles.author}>{user?.name}</div>
          </div>
        </div>
        <div className={styles.textareaContainer}>
          <motion.textarea
            id="description"
            name="description"
            value={value}
            onChange={handleChange}
            className={styles.scrollTextarea}
            required
            rows={2}
          />
        </div>
        <div className={styles.buttonsContainer}>
          <Button type="submit" label="Publish" size="small" />
        </div>
      </form>
    </>
  );
};
