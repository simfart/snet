import React from 'react';
import { motion } from 'framer-motion';
import styles from './ScrollTextarea.module.scss';

interface ScrollTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const ScrollTextarea: React.FC<ScrollTextareaProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className={styles.textareaContainer}>
      <motion.textarea
        value={value}
        onChange={onChange}
        className={styles.scrollTextarea}
        required
        rows={4}
      />
    </div>
  );
};
