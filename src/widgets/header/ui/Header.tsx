import { FC } from 'react';
import React, { useState } from 'react';
import { seachIcon } from 'shared/assets/images';
import { Dropdown } from 'entities/menu';
import { motion } from 'framer-motion';
import {
  buttonHoverAnimation,
  formAnimation,
  inputFocusAnimation,
} from 'shared/animations/animationSettings';
import { useLogout } from 'features/auth/useLogout';
import { Loader } from 'shared/ui';
import { LogoItem } from 'shared/components';

import styles from './Header.module.scss';

export const Header: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
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
  isLoading && <Loader />;

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
      <Dropdown onLogoutClick={handleLogout} />
    </header>
  );
};
