import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './style.css';

const menu = {
  closed: {
    scale: 0,
    transition: {
      delay: 0.15,
    },
  },
  open: {
    scale: 1,
    transition: {
      type: 'spring',
      duration: 0.4,
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
};

const item = {
  closed: { x: -16, opacity: 0 },
  open: { x: 0, opacity: 1 },
  transition: { opacity: { duration: 0.2 } },
};

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <div className="menu-container">
      <button className="button" onClick={() => setOpen((prev) => !prev)}>
        Options
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menu}
          >
            <motion.div {...item} className="menu-item">
              Edit
            </motion.div>
            <motion.div {...item} className="menu-item">
              Share
            </motion.div>
            <motion.div {...item} className="menu-item">
              Delete
            </motion.div>
            <motion.div {...item} className="menu-item">
              Report
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
