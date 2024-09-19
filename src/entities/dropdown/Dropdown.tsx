import { FC, useState, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { IUser } from 'entities/user/model/userModel';
import { dropDownIcon } from 'shared/assets/images';
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
  variant?: 'post' | 'header';
}

export const Dropdown: FC<DropdownProps> = ({ user }) => {
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

  const menuItems = [
    {
      label: 'Settings',
      // onClick: openPopup,
    },
    {
      label: 'Log out',
      // onClick: handleLogout,
    },
  ];

  return (
    <div className={styles.dropdown} onClick={toggleDropdown}>
      <>
        <motion.div
          className={styles.burger}
          initial={false}
          animate={
            isOpen
              ? { scale: 0.8, backgroundColor: '#f0f0f0' }
              : { scale: 1, backgroundColor: 'transparent' }
          }
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={false}
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          />
          <motion.div
            initial={false}
            animate={isOpen ? { rotate: -45 } : { rotate: 0 }}
          />
          <motion.div
            initial={false}
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className={styles.lineBottom}
          />
        </motion.div>
        <div className={styles.userMenu}>
          {user && <span>{user.name}</span>}
          <motion.img
            src={dropDownIcon}
            alt="Dropdown Icon"
            animate={isOpen ? 'open' : 'closed'}
            variants={iconVariants}
          />
        </div>
      </>
      <motion.div
        ref={dropdownRef}
        className={styles.popup}
        initial={{ x: '100%' }}
        animate={isOpen ? { x: 0 } : { x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
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
            <div>&gt;</div>
          </motion.button>
        ))}
      </motion.div>

      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          variants={overlayVariants}
          onClick={closeMenu}
        />
      )}
    </div>
  );
};
