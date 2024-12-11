import { FC } from 'react';
import { logoIcon } from 'shared/assets/images';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { logoAnimations } from 'shared/animations/animationSettings';
import styles from './LogoItem.module.scss';

export const LogoItem: FC = () => {
  return (
    <>
      <Link to="/" className={styles.logo}>
        <motion.img
          src={logoIcon}
          alt="Logo"
          {...logoAnimations.iconAnimation}
        />
        <motion.div
          className={`${styles['logo-title']} ${styles['logo-title_mark']}`}
          {...logoAnimations.titleAnimation}
        >
          SOCIUM
        </motion.div>
      </Link>
    </>
  );
};
