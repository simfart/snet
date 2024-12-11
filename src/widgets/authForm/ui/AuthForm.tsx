import { useCallback } from 'react';
import { Input, LogoItem } from 'shared/components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  buttonAuthAnimation,
  containerAnimation,
} from 'shared/animations/animationSettings';
import styles from './AuthForm.module.scss';

type InputConfig = {
  value: string;
  required: boolean;
  type: string;
};

interface AuthFormProps {
  mode: 'login' | 'register';
  title: string;
  buttonText: string;
  linkUrl: string;
  linkText: string;
  spanText: string;
  values: Record<string, string>;
  initialData: Record<string, InputConfig>;
  onSubmit: (formData: Record<string, string>) => void;
  handleSubmit: (
    callback: (formData: Record<string, string>) => void,
  ) => (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  getErrorClass: (fieldName: string) => string;
}

export const AuthForm = ({
  mode,
  title,
  buttonText,
  linkUrl,
  linkText,
  initialData,
  handleChange,
  handleFocus,
  onSubmit,
  handleSubmit,
  values,
  getErrorClass,
  spanText,
}: AuthFormProps) => {
  const renderInputs = useCallback(() => {
    return Object.entries(initialData).map(([key, config]) => (
      <Input
        key={key}
        id={key}
        name={key}
        type={config.type}
        value={values[key]}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder={key}
        required={config.required}
        mode="login"
        inputClassName={styles[getErrorClass(key)]}
      />
    ));
  }, [initialData, values, handleChange, handleFocus, getErrorClass]);

  return (
    <motion.div
      className={`${styles.container} ${
        mode === 'register' ? styles.registerMode : ''
      }`}
      variants={containerAnimation}
      initial="hidden"
      animate="visible"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <LogoItem />
        <h1>{title}</h1>
        {renderInputs()}
        <motion.button type="submit" {...buttonAuthAnimation}>
          {buttonText}
        </motion.button>
        <span>
          {spanText}
          <Link to={linkUrl} className="auth-iconlink">
            {linkText}
          </Link>
        </span>
      </form>
    </motion.div>
  );
};
