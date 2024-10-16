import { FC, FormEvent, useState } from 'react';
import { Avatar, Button } from 'shared/components';
import { useCreatePost } from '../hooks/useCreatePost';
import { UploadPopup } from 'features/uploadPopup';
import { AnimatePresence, motion } from 'framer-motion';
import { uploadButtonAuthAnimation } from 'shared/animations/animationSettings';
import { cameraIcon } from 'shared/assets/images';
import { IUser } from 'entities/user/model/userModel';

import styles from './CreatePostForm.module.scss';

interface Props {
  user: IUser;
  variant?: 'profilePage';
  invalidateKeys: (string | string[])[];
  // setIsCreatingPost: (isCreating: boolean) => void;
}

export const CreatePostForm: FC<Props> = ({
  user,
  variant,
  invalidateKeys,
  // setIsCreatingPost,
}) => {
  const [value, setValue] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const { mutate } = useCreatePost(invalidateKeys);

  // const onSubmit = (formData: {
  //   description: string;
  //   image: string;
  //   tags: string[];
  // }) => {
  //   try {
  //     mutate({
  //       description: formData.description,
  //       image: formData.image,
  //       tags: formData.tags,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() === '') {
      alert('Please fill out the required field.');
      return;
    }

    // setIsCreatingPost(true);

    const tags = extractHashtags(value);
    const description = value.replace(/#\w+/g, '').trim();

    mutate(
      { description, image, tags },
      // {
      //   onSuccess: () => setIsCreatingPost(false),
      //   onError: () => setIsCreatingPost(false),
      // },
    );
    setValue('');
    setImage('');
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
