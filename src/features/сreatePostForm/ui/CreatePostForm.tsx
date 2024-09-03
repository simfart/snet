import { FC, useState } from 'react';
import { Loader } from 'shared/ui';
import { Button } from 'shared/components';
import { useCreatePost } from '../hooks/useCreatePost';
import { UploadPopup } from 'features/uploadPopup';
import { AnimatePresence, motion } from 'framer-motion';
import { uploadButtonAuthAnimation } from 'shared/animations/animationSettings';
import { cameraIcon } from 'shared/assets/images';

import styles from './CreatePostForm.module.scss';

interface IUserProps {
  name: string;
  avatar: string;
}

export const CreatePostForm: FC<IUserProps> = ({ avatar, name }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [value, setValue] = useState('');
  const [image, setImage] = useState<string>('');

  const { mutate, isLoading } = useCreatePost();

  const onSubmit = (formData: Record<string, string>) => {
    try {
      mutate({ description: formData.description, image: formData.image });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() === '') {
      alert('Please fill out the required field.');
      return;
    }
    console.log('Submitted value:', value, image);
    onSubmit({ description: value, image });
    setValue('');
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

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
            setImage={setImage} // Передаём функцию для установки изображения
          />
        )}
      </AnimatePresence>
    </>
  );
};
