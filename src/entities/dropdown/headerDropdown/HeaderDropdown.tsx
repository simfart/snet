import { FC, useState, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { IUser } from 'entities/user/model/userModel';
import { dropDownIcon } from 'shared/assets/images';
import { useOutsideClick } from 'shared/hooks/useOutsideClick';
import {
  iconVariants,
  itemVariants,
  overlayVariants,
} from 'shared/animations/dropdownVariants';
import { useLogout } from 'features/auth/useLogout';
import { Loader } from 'shared/ui';
import { burgerAnimationConfig } from 'shared/animations/animationSettings';

import styles from './HeaderDropdown.module.scss';
import { useNavigate } from 'react-router-dom';

interface DropdownProps {
  user: IUser;
  openPopup: (e?: MouseEvent<HTMLButtonElement>) => void;
}

export const HeaderDropdown: FC<DropdownProps> = ({ user, openPopup }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: logout, isLoading } = useLogout();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = (e?: MouseEvent<HTMLDivElement>) => {
    e?.stopPropagation();
    setIsOpen((prevState) => !prevState);
  };

  const closeMenu = () => setIsOpen(false);

  useOutsideClick(dropdownRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const handleLogout = () => {
    logout();
  };

  const handleSettings = () => {
    toggleDropdown();
    openPopup();
  };

  const handleProfileClick = () => {
    navigate(`/profile/${user.objectId}`);
  };

  const dropDownItems = [
    {
      label: 'Profile',
      onClick: handleProfileClick,
    },
    {
      label: 'Settings',
      onClick: handleSettings,
    },
    {
      label: 'Log out',
      onClick: handleLogout,
    },
  ];

  isLoading && <Loader />;

  return (
    <div className={styles.dropdownContainer} onClick={toggleDropdown}>
      <>
        <motion.div
          className={styles.burger}
          {...burgerAnimationConfig(isOpen)}
        >
          <motion.div
            initial={false}
            animate={
              isOpen ? { rotate: 45, y: 8, x: -5.5 } : { rotate: 0, y: 0 }
            }
          />
          <motion.div
            initial={false}
            animate={isOpen ? { rotate: -45, x: -5.5 } : { rotate: 0 }}
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
        className={styles.dropdown}
        initial={{ x: '101%' }}
        animate={isOpen ? { x: 0 } : { x: '101%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {dropDownItems.map((item, index) => (
          <motion.button
            key={index}
            onClick={item.onClick}
            className={styles.dropDownItem}
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
