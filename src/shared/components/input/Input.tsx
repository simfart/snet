import { FC } from 'react';
import styles from './Input.module.scss';
import { motion } from 'framer-motion';
import { inputFocusAnimation } from 'shared/animations/animationSettings';

interface InputProps {
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  name?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  inputClassName?: string;
  mode?: 'login' | 'register';
}

export const Input: FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  onFocus,
  placeholder,
  label,
  name,
  id,
  className,
  disabled = false,
  required = false,
  mode = 'login',
  inputClassName,
}) => {
  const containerClassName = `${styles.container} ${className} ${
    mode === 'login' ? styles.login : styles.register
  }`;
  const inputClassNames = `${styles.input} ${inputClassName || ''}`;

  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <motion.input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        name={name}
        id={id}
        className={inputClassNames}
        disabled={disabled}
        required={required}
        {...inputFocusAnimation}
      />
    </div>
  );
};
