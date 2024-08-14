import { FC, useEffect, useRef, useState } from 'react';
import { Loader } from 'shared/ui';
import { createPostInputs } from 'shared/inputs/formInputs';
import { useForm } from 'shared/hooks/useForm';
import { useCreatePost } from '../model/useCreatePost';

import { IUser } from 'entities/user/model/userModel';

import styles from './CreatePostForm.module.scss';
import { Input } from 'shared/components';
import { motion, useAnimation } from 'framer-motion';
import { ScrollTextarea } from './ScrollTextarea';

interface IUserProps {
  name: string;
  avatar: string;
}

export const CreatePostForm: FC<IUserProps> = ({ avatar, name }) => {
  const { mutate, isLoading } = useCreatePost();

  const onSubmit = (formData: Record<string, string>) => {
    try {
      mutate({ description: formData.description, image: formData.image });
    } catch (err) {
      console.log(err);
    }
  };

  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() === '') {
      alert('Please fill out the required field.');
      return;
    }
    console.log('Submitted value:', value);
    setValue('');
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={styles.createPostContainer}
    >
      <div className={styles.header}>
        <img
          className={styles.avatar}
          src={avatar || 'https://via.placeholder.com/50'}
          alt="Author"
        />
        <div className={styles.authorDetails}>
          <div className={styles.author}>{name}</div>
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

      <button type="submit">Create Post</button>
    </form>
  );
};
