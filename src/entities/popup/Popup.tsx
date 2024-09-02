import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from './Popup.module.scss';
import { closeIcon } from 'shared/assets/images';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Popup: FC<PopupProps> = ({ isOpen, onClose, children }) => {
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
        {children}
        <button className={styles.buttonClose} onClick={onClose}>
          <img src={closeIcon} alt="Close Icon" />
        </button>
      </motion.div>
    </motion.div>
  );
};
