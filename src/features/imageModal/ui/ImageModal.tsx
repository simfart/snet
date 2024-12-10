import { motion } from 'framer-motion';
import { FC } from 'react';

import styles from './ImageModal.module.scss';
import { closeIcon } from 'shared/assets/images';
import {
  closeButtonAnimate,
  modalContentAnimate,
  modalOverlayAnimate,
} from 'shared/animations/imageModalAnimations';

export const ImageModal: FC<{ src: string; onClose: () => void }> = ({
  src,
  onClose,
}) => (
  <motion.div
    className={styles.modalOverlay}
    onClick={onClose}
    {...modalOverlayAnimate}
  >
    <motion.div
      className={styles.modalContent}
      onClick={(e) => e.stopPropagation()}
      {...modalContentAnimate}
    >
      <img src={src} alt="Full View" className={styles.modalImage} />
      <motion.button
        className={styles.closeButton}
        onClick={onClose}
        {...closeButtonAnimate}
      >
        <img src={closeIcon} alt="CloseIcon" />
      </motion.button>
    </motion.div>
  </motion.div>
);
