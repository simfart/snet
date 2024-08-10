import { FC, useState, MouseEvent, useRef } from 'react';
import { motion } from 'framer-motion';
import { useUser } from 'features/auth/useUser';
import { dropDownIcon } from 'shared/assets/images';
import { useOutsideClick } from 'shared/hooks/useOutsideClick';
import {
  dropdownVariants,
  iconVariants,
  itemVariants,
  overlayVariants,
} from 'shared/animations/dropdownVariants';

import styles from './Dropdown.module.scss';

interface DropdownProps {
  onLogoutClick: () => void;
}

export const Dropdown: FC<DropdownProps> = ({ onLogoutClick }) => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen((prevState) => !prevState);
  };

  const closeMenu = () => setIsOpen(false);

  useOutsideClick(dropdownRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <div className={styles.profile} onClick={toggleDropdown}>
      <span>{user.name}</span>
      <motion.img
        src={dropDownIcon}
        alt="Dropdown Icon"
        animate={isOpen ? 'open' : 'closed'}
        variants={iconVariants}
      />
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          variants={overlayVariants}
          onClick={closeMenu}
        />
      )}
      <motion.div
        className={styles.dropdownMenu}
        ref={dropdownRef}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={dropdownVariants}
      >
        <motion.button
          className={styles.menuItem}
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Settings
          <div>&gt;</div>
        </motion.button>
        <motion.button
          onClick={onLogoutClick}
          className={styles.menuItem}
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Log out
          <div>&gt;</div>
        </motion.button>
      </motion.div>
    </div>
  );
};
