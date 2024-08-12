import { FC } from 'react';
import React, { useState } from 'react';
import { seachIcon } from 'shared/assets/images';
import { Dropdown } from 'entities/dropdown';
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

import styles from './Header.module.scss';
import { UserEditPopup } from 'entities/userEditPopup';

export const Header: FC = () => {
  const { user, isLoading: isLoadUser } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { mutate: logout, isLoading } = useLogout();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search Term:', searchTerm);
  };

  const handleLogout = () => {
    logout();
  };
  (isLoading || isLoadUser) && <Loader />;

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <header className={styles.header}>
      <LogoItem />
      <motion.form
        className={styles.searchForm}
        onSubmit={handleSearchSubmit}
        {...formAnimation}
      >
        <motion.input
          type="text"
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search"
          {...inputFocusAnimation}
        />
        <motion.button
          type="submit"
          className={styles.searchButton}
          {...buttonHoverAnimation}
        >
          <img src={seachIcon} alt={seachIcon} />
        </motion.button>
      </motion.form>
      <Dropdown
        onLogoutClick={handleLogout}
        onEditFormClick={openPopup}
        user={user}
      />
      <AnimatePresence>
        {isPopupOpen && (
          <UserEditPopup isOpen={isPopupOpen} onClose={closePopup} />
        )}
      </AnimatePresence>
    </header>
  );
};
