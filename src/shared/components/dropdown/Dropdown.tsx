import { FC, useState, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { IUser } from 'entities/user/model/userModel';
import {
  deleteIcon,
  dropDownIcon,
  dropDownPostIcon,
} from 'shared/assets/images';
import { useOutsideClick } from 'shared/hooks/useOutsideClick';
import {
  dropdownVariants,
  iconVariants,
  itemVariants,
  overlayVariants,
} from 'shared/animations/dropdownVariants';

import styles from './Dropdown.module.scss';

interface DropdownItem {
  label: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

interface DropdownProps {
  menuItems: DropdownItem[];
  user?: IUser;
  variant?: 'post';
}

export const Dropdown: FC<DropdownProps> = ({ menuItems, user, variant }) => {
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
    <div
      className={`${styles.dropdown} ${
        variant && styles[variant] ? styles[variant] : ''
      }`}
      onClick={toggleDropdown}
    >
      {user && <span>{user.name}</span>}
      <motion.img
        src={variant === 'post' ? dropDownPostIcon : dropDownIcon}
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
        {menuItems.map((item, index) => (
          <motion.button
            key={index}
            onClick={item.onClick}
            className={styles.menuItem}
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {item.label}
            {variant === 'post' ? (
              <img src={deleteIcon} alt="Delete icon" />
            ) : (
              <div>&gt;</div>
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};
