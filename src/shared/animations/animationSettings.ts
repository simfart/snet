export const formAnimation = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const inputFocusAnimation = {
  whileFocus: { scale: 1.05 },
  transition: { duration: 0.2 },
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

export const resetButtonAuthAnimation = {
  whileHover: {
    scale: 1.08,
    color: '#E25A99',
    transition: { duration: 0.3 },
  },
  whileTap: { scale: 0.9, transition: { duration: 0.2 } },
  transition: { type: 'spring', stiffness: 200 },
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
