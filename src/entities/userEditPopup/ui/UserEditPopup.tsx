import { FC, useCallback, useEffect, useState } from 'react';
import styles from './UserEditPopup.module.scss';
import { motion } from 'framer-motion';
import { editUserInputs } from 'shared/inputs/formInputs';
import { InputField } from 'shared/components';
import { useForm } from 'shared/hooks/useForm';
import { useUser } from 'features/auth/useUser';
import { IUser } from 'entities/user/model/userModel';
import { useEditUser } from '../model/useEditUser';

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
    mutate(values);
    onClose();
  };

  const renderInputs = useCallback(() => {
    return Object.entries(editUserInputs).map(([key, config]) => (
      <InputField
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
  }, [values, handleChange, handleFocus, getErrorClass]);

  if (!isOpen) return null;

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
          <motion.button type="submit">Save</motion.button>
          <button onClick={onClose}>Close</button>
        </form>
      </motion.div>
    </motion.div>
  );
};
