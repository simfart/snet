import { FC } from 'react';
import { motion } from 'framer-motion';
import {
  buttonAuthAnimation,
  uploadButtonAuthAnimation,
} from 'shared/animations/animationSettings';

import styles from './Button.module.scss';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  size?: 'small' | 'medium';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'upload' | 'light' | 'lightcolor';
  icon?: string;
};

export const Button: FC<ButtonProps> = ({
  label,
  icon,
  onClick,
  size = 'large',
  disabled = false,
  type = 'button',
  variant,
}) => {
  const animationProps =
    variant === 'light' || variant === 'lightcolor'
      ? uploadButtonAuthAnimation
      : buttonAuthAnimation;
  return (
    <motion.button
      className={`${styles.button} ${styles[size]} ${
        variant && styles[variant]
      }`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...animationProps}
    >
      {icon && <img src={icon} alt={icon} />}
      {label}
    </motion.button>
  );
};
