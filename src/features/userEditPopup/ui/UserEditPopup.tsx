import { FC, useEffect } from 'react';
import { editUserInputs } from 'shared/inputs/formInputs';
import { IUser } from 'entities/user/model/userModel';
import { useCurrentUser, useEditUser } from 'entities/user/hooks';
import { Button, Input, Popup } from 'shared/components';
import { Loader } from 'shared/ui';
import { backIcon } from 'shared/assets/images';
import { motion } from 'framer-motion';
import { useForm } from 'shared/hooks';
import styles from './UserEditPopup.module.scss';

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

  const { user, isLoading: isLoadingUser } = useCurrentUser();
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
      if (
        values[key] !== user[key as keyof typeof user] &&
        values[key] !== ''
      ) {
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
    <Popup isOpen={isOpen} onClose={onClose} variant="settings">
      <div className={styles.profile}>
        <motion.button
          className={styles.buttonBack}
          onClick={onClose}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <img src={backIcon} alt="Back Icon" />
        </motion.button>
        <h2>Profile</h2>
      </div>
      <span>
        All information that you will provide can be seen by the public.
      </span>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {renderInputs()}
        <Button label="Save" type="submit" size="medium" />
      </form>
    </Popup>
  );
};
