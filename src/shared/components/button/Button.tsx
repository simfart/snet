import { FC } from 'react';
import { motion } from 'framer-motion';
import { buttonAuthAnimation } from 'shared/animations/animationSettings';

import styles from './Button.module.scss';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  size?: 'small' | 'medium';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'upload';
};

export const Button: FC<ButtonProps> = ({
  label,
  onClick,
  size = 'large',
  disabled = false,
  type = 'button',
  variant,
}) => {
  return (
    <motion.button
      className={`${styles.button} ${styles[size]} ${
        variant && styles[variant]
      }`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...buttonAuthAnimation}
    >
      {label}
    </motion.button>
  );
};
