import { Loader } from 'shared/ui';
import { Avatar, Button } from 'shared/components';
import { useCreatePost } from '../hooks/useCreatePost';
import { UploadPopup } from 'features/uploadPopup';
import { AnimatePresence, motion } from 'framer-motion';
import { uploadButtonAuthAnimation } from 'shared/animations/animationSettings';
import { cameraIcon } from 'shared/assets/images';

import styles from './CreatePostForm.module.scss';

import React, { useState } from 'react';
import { IUser } from 'entities/user/model/userModel';

interface Props {
  user: IUser;
}

export const CreatePostForm: React.FC<Props> = ({ user }) => {
  const [value, setValue] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const { mutate, isLoading } = useCreatePost();

  const onSubmit = (formData: {
    description: string;
    image: string;
    tags: string[];
  }) => {
    try {
      mutate({
        description: formData.description,
        image: formData.image,
        tags: formData.tags,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const extractHashtags = (text: string): string[] => {
    const regex = /#(\w+)/g;
    const tags = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      tags.push(match[1]);
    }
    return tags;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() === '') {
      alert('Please fill out the required field.');
      return;
    }

    const tags = extractHashtags(value);
    const description = value.replace(/#\w+/g, '').trim();

    onSubmit({ description, image, tags });
    setValue('');
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className={styles.createPostContainer}
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
          <motion.button
            className={styles.upload}
            onClick={openPopup}
            type="button"
            {...uploadButtonAuthAnimation}
          >
            <img src={cameraIcon} alt="" />
            Upload
          </motion.button>
          <Button type="submit" label="Publish" size="small" />
        </div>
      </form>
      <AnimatePresence>
        {isPopupOpen && (
          <UploadPopup
            isOpen={isPopupOpen}
            onClose={closePopup}
            setImage={setImage}
          />
        )}
      </AnimatePresence>
    </>
  );
};
