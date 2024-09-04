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
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 30,
    },
  },
  closed: {
    rotate: 0,
  },
  transition: {
    type: 'spring',
    stiffness: 200,
    damping: 30,
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
    scale: 1.05,
    backgroundColor: 'rgba(232, 77, 149, 0.08)',
    color: 'rgb(226, 90, 153)',
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

export const overlayVariants = {
  open: {
    opacity: 1,
    display: 'block',
    transition: {
      duration: 0.3,
    },
  },
  closed: {
    opacity: 0,
    transitionEnd: {
      display: 'none',
    },
    transition: {
      duration: 0.3,
    },
  },
};
