export const closeButtonAnimate = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 1 } },
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.9 },
  transition: { type: 'spring', stiffness: 500 },
};

export const modalOverlayAnimate = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export const modalContentAnimate = {
  initial: { scale: 0.8 },
  animate: { scale: 1 },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
};
