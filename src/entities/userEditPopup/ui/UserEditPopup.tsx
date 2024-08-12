import { FC, useEffect } from 'react';
import styles from './UserEditPopup.module.scss';
import { motion } from 'framer-motion';
import { editUserInputs } from 'shared/inputs/formInputs';
import { useForm } from 'shared/hooks/useForm';
import { useUser } from 'features/auth/useUser';
import { IUser } from 'entities/user/model/userModel';
import { useEditUser } from '../hooks/useEditUser';
import { Button, Input } from 'shared/components';
import { closeIcon } from 'shared/assets/images';
import { Loader } from 'shared/ui';

interface UserEditPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormState = {
  [key in keyof typeof editUserInputs]: string;
};

export const UserEditPopup: FC<UserEditPopupProps> = ({ isOpen, onClose }) => {
  const {
    handleChange,
    handleFocus,
    handleSubmit,
    values,
    getErrorClass,
    updateValues,
  } = useForm(editUserInputs);

  const { user, isLoading: isLoadingUser } = useUser();
  const { mutate, isLoading } = useEditUser();

  useEffect(() => {
    if (user && !isLoadingUser) {
      const userValues = Object.keys(editUserInputs).reduce((acc, key) => {
        if (key in user) {
          acc[key as keyof FormState] = user[key as keyof IUser] || '';
        }
        return acc;
      }, {} as Partial<FormState>);

      updateValues(userValues);
    }
  }, [user, isLoadingUser, updateValues]);

  const onSubmit = () => {
    if (!user) return;

    const changedValues = Object.keys(values).reduce((acc, key) => {
      if (values[key] !== user[key as keyof typeof user]) {
        acc[key as keyof FormState] = values[key];
      }
      return acc;
    }, {} as Partial<FormState>);

    if (Object.keys(changedValues).length > 0) {
      mutate(changedValues);
    }
    onClose();
  };

  const renderInputs = () => {
    return Object.entries(editUserInputs).map(([key, config]) => (
      <Input
        key={key}
        id={key}
        name={key}
        type={config.type}
        value={values[key] || ''}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder={key}
        required={config.required}
        inputClassName={styles[getErrorClass(key)]}
      />
    ));
  };

  if (!isOpen) return null;
  if (isLoading) return <Loader />;

  return (
    <motion.div
      className={styles.popupOverlay}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={styles.popupContent}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2>Profile</h2>
        <span>
          All information that you will provide can be seen by the public.
        </span>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {renderInputs()}
          <Button label="Save" type="submit" size="medium" />
        </form>
      </motion.div>
      <button onClick={onClose}>
        <img src={closeIcon} alt="Close Icon" />
      </button>
    </motion.div>
  );
};
