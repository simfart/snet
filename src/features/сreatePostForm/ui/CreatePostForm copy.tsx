import { Loader } from 'shared/ui';
import { Button } from 'shared/components';
import { useCreatePost } from '../hooks/useCreatePost';
import { UploadPopup } from 'features/uploadPopup';
import { AnimatePresence, motion } from 'framer-motion';
import { uploadButtonAuthAnimation } from 'shared/animations/animationSettings';
import { cameraIcon } from 'shared/assets/images';

import styles from './CreatePostForm.module.scss';

import React, { useState } from 'react';

interface Props {
  avatar?: string;
  name: string;
}

export const YourComponent: React.FC<Props> = ({ avatar, name }) => {
  const [value, setValue] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const { mutate, isLoading } = useCreatePost();

  const onSubmit = (formData: {
    description: string;
    image: string;
    tags: string[];
  }) => {
    console.log(
      'description:',
      formData.description,
      'image:',
      formData.image,
      'tags:',
      formData.tags,
    );
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

  const extractHashtags = (text: string): string => {
    const regex = /#(\w+)/g;
    const tags = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      tags.push(match[1]); // добавляем хештег без решетки
    }
    return tags.join(','); // соединяем теги в строку через запятую
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() === '') {
      alert('Please fill out the required field.');
      return;
    }

    const tags = extractHashtags(value);
    const description = value.replace(/#\w+/g, '').trim(); // удаляем хештеги из описания

    console.log('Submitted value:', description, image, tags);
    onSubmit({ description, image, tags });
    setValue('');
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
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
