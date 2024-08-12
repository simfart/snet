import { FC } from 'react';
import styles from './Button.module.scss';
import { motion } from 'framer-motion';
import { buttonAuthAnimation } from 'shared/animations/animationSettings';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  size?: 'small' | 'medium';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export const Button: FC<ButtonProps> = ({
  label,
  onClick,
  size = 'large',
  disabled = false,
  type = 'button',
}) => {
  return (
    <motion.button
      className={`${styles.button} ${styles[size]}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...buttonAuthAnimation}
    >
      {label}
    </motion.button>
  );
};
