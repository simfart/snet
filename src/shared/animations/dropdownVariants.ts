export const dropdownVariants = {
  open: {
    opacity: 1,
    y: 0,
    display: 'block',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  closed: {
    opacity: 0,
    y: -20,
    transitionEnd: {
      display: 'none',
    },
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

export const iconVariants = {
  open: {
    rotate: 180,
  },
  closed: {
    rotate: 0,
  },
};

export const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  closed: {
    opacity: 0,
    y: -10,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
  hover: {
    scale: 1.1,
    backgroundColor: '#f0f0f0',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
  tap: {
    scale: 0.95,
  },
};
