export const inputFocusAnimation = {
  whileFocus: { scale: 1.1 },
  transition: { duration: 0.3 },
  whileHover: { scale: 1.1 },
};

export const buttonHoverAnimation = {
  whileHover: { scale: 1.1 },
  transition: { duration: 0.2 },
};

export const buttonAuthAnimation = {
  whileHover: {
    boxShadow: '0px 4px 15px rgba(255, 10, 67, 0.2)',
    transition: { duration: 0.3 },
  },
  whileTap: {
    scale: 0.95,
    backgroundColor: 'rgb(207, 79, 160)',
    transition: { duration: 0.2 },
  },
  initial: { scale: 1, backgroundColor: '#e25a99' },
};

export const uploadButtonAuthAnimation = {
  whileHover: {
    boxShadow: '0px 4px 15px rgba(255, 10, 67, 0.2)',
    transition: { duration: 0.3 },
  },
  whileTap: {
    scale: 0.95,
    backgroundColor: '#e25a99',
    transition: { duration: 0.2 },
  },
  initial: { scale: 1, backgroundColor: 'rgba(232, 77, 149, 0.08)' },
};

export const containerAnimation = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export const linkAnimation = {
  whileHover: {
    scale: 1.08,
  },
  whileTap: {
    scale: 0.9,
  },
  initial: { scale: 1 },
  transition: { type: 'spring', stiffness: 100 },
};

export const burgerAnimationConfig = (isOpen: boolean) => ({
  initial: { width: '29px', height: '19px' },
  animate: {
    width: isOpen ? '18px' : '29px',
    height: isOpen ? '18px' : '19px',
    backgroundColor: isOpen ? 'rgba(232, 77, 149, 0.08)' : 'rgba(0, 0, 0, 0)',
    padding: isOpen ? '10px' : '0px',
    borderRadius: isOpen ? '10px' : '0px',
  },
  transition: { duration: 0.3 },
});

export const logoAnimations = {
  iconAnimation: {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
    whileHover: { scale: 1.1 },
  },
  titleAnimation: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, delay: 0.2 },
  },
};

export const likeButtonAnimations = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
  transition: { duration: 0.3 },
  whileHover: { scale: 1.1 },
};
