import { FC } from 'react';
import React, { useState } from 'react';
import { closeIcon, seachIcon } from 'shared/assets/images';
import { AnimatePresence, motion } from 'framer-motion';
import {
  buttonHoverAnimation,
  formAnimation,
  inputFocusAnimation,
} from 'shared/animations/animationSettings';
import { useLogout } from 'features/auth/useLogout';
import { Loader } from 'shared/ui';
import { LogoItem } from 'shared/components';
import { useUser } from 'features/auth/useUser';
import { UserEditPopup } from 'features/userEditPopup';
import { Dropdown } from 'shared/components/dropdown';

import styles from './Header.module.scss';

interface HeaderProps {
  onSearchClick: (tagId: string) => void;
}

export const Header: FC<HeaderProps> = ({ onSearchClick }) => {
  const { user, isLoading: isLoadUser } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { mutate: logout, isLoading } = useLogout();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchClick(searchTerm);
    console.log('Search Term:', searchTerm);
  };

  const handleLogout = () => {
    logout();
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const clearSearch = () => {
    onSearchClick('');
    setSearchTerm('');
  };

  const menuItems = [
    {
      label: 'Settings',
      onClick: openPopup,
    },
    {
      label: 'Log out',
      onClick: handleLogout,
    },
  ];

  (isLoading || isLoadUser) && <Loader />;

  return (
    <header className={styles.header}>
      <LogoItem />
      <motion.form
        className={styles.searchForm}
        onSubmit={handleSearchSubmit}
        {...formAnimation}
      >
        <motion.button
          type="submit"
          className={styles.searchButton}
          {...buttonHoverAnimation}
        >
          <img src={seachIcon} alt={seachIcon} />
        </motion.button>
        <motion.input
          type="text"
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search"
          {...inputFocusAnimation}
        />
        <motion.button
          type="button"
          onClick={clearSearch}
          className={styles.clearButton}
          {...buttonHoverAnimation}
        >
          <img src={closeIcon} alt="Clear" />
        </motion.button>
      </motion.form>
      <Dropdown menuItems={menuItems} user={user} />
      <AnimatePresence>
        {isPopupOpen && (
          <UserEditPopup isOpen={isPopupOpen} onClose={closePopup} />
        )}
      </AnimatePresence>
    </header>
  );
};
