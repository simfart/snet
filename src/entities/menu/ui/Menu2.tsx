import React, { useState, useRef, useEffect, FC } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const Dropdown: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
      });
    } else {
      controls.start({
        opacity: 0,
        y: -10,
        transition: { duration: 0.2, ease: 'easeIn' },
      });
    }
  }, [isOpen, controls]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={toggleDropdown} style={buttonStyle}>
        Toggle Dropdown
      </button>
      <motion.div
        ref={dropdownRef}
        initial={{ opacity: 0, y: -10 }}
        animate={controls}
        style={dropdownStyle}
      >
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Option 1
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Option 2
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Option 3
          </motion.li>
        </ul>
      </motion.div>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#3498db',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '4px',
  outline: 'none',
};

const dropdownStyle: React.CSSProperties = {
  position: 'absolute',
  top: '100%',
  left: 0,
  backgroundColor: 'white',
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  padding: '12px',
  zIndex: 1,
  borderRadius: '4px',
};
