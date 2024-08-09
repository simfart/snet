import { FC, useState, MouseEvent, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Dropdown.module.scss';
import { useUser } from 'features/auth/useUser';
import { dropDownIcon } from 'shared/assets/images';
import { useOutsideClick } from 'shared/hooks/useOutsideClick';
import {
  dropdownVariants,
  iconVariants,
  itemVariants,
} from 'shared/animations/dropdownVariants';

export const Dropdown: FC = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen((prevState) => !prevState);
  };

  useOutsideClick(dropdownRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <div className={styles.profile} onClick={toggleDropdown} ref={dropdownRef}>
      <span>{user.name}</span>
      <motion.img
        src={dropDownIcon}
        alt="Dropdown Icon"
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={iconVariants}
      />
      <motion.div
        className={styles.dropdownMenu}
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
        </motion.button>
        <motion.button
          className={styles.menuItem}
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Log out
        </motion.button>
      </motion.div>
    </div>
  );
};
