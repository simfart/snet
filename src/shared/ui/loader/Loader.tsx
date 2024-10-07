import { FC } from 'react';
import { motion } from 'framer-motion';
import styles from './Loader.module.scss';

const loaderVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'linear',
    },
  },
  pulse: {
    scale: [1, 1.2, 1],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

export const Loader: FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <motion.div
        className={styles.loaderCircle}
        variants={loaderVariants}
        animate={['animate', 'pulse']}
      />
    </div>
  );
};
